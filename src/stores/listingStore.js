import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useListingStore = create((set, get) => ({
  listings: [],
  filteredListings: [],
  loading: false,
  error: null,
  filters: {
    priceRange: [0, 100],
    categories: [],
    dietaryOptions: [],
    freeOnly: false,
    expiringSoon: false
  },
  
  fetchListings: async () => {
    try {
      set({ loading: true, error: null })
      
      console.log('Fetching listings...')
      
      // Simple query to check if the table exists
      const { data: checkData, error: checkError } = await supabase
        .from('listings')
        .select('id')
        .limit(1)
      
      if (checkError) {
        console.error('Error checking listings table:', checkError)
        throw checkError
      }
      
      console.log('Listings table exists, fetching data...')
      
      // Now fetch the actual data
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles:supplier_id(id, name, avatar_url)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      console.log('Fetched listings:', data)
      
      set({ 
        listings: data || [],
        filteredListings: data || [],
        loading: false
      })
      
      // Apply any existing filters
      get().applyFilters()
    } catch (error) {
      console.error('Error fetching listings:', error)
      set({ error: error.message, loading: false })
    }
  },
  
  fetchUserListings: async (userId) => {
    try {
      set({ loading: true, error: null })
      
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles:supplier_id(id, name, avatar_url)
        `)
        .eq('supplier_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      set({ 
        listings: data || [],
        filteredListings: data || [],
        loading: false
      })
    } catch (error) {
      console.error('Error fetching user listings:', error)
      set({ error: error.message, loading: false })
    }
  },
  
  setFilters: (newFilters) => {
    set({ filters: newFilters })
    get().applyFilters()
  },
  
  resetFilters: () => {
    set({
      filters: {
        priceRange: [0, 100],
        categories: [],
        dietaryOptions: [],
        freeOnly: false,
        expiringSoon: false
      }
    })
    get().applyFilters()
  },
  
  applyFilters: () => {
    const { listings, filters } = get()
    
    let filtered = [...listings]
    
    // Apply price filter
    filtered = filtered.filter(listing => {
      if (filters.freeOnly) {
        return listing.price === 0
      } else {
        return listing.price >= filters.priceRange[0] && 
               listing.price <= filters.priceRange[1]
      }
    })
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(listing => 
        filters.categories.includes(listing.category)
      )
    }
    
    // Apply dietary options filter
    if (filters.dietaryOptions.length > 0) {
      filtered = filtered.filter(listing => {
        if (!listing.dietary_info) return false
        return filters.dietaryOptions.some(option => 
          listing.dietary_info.includes(option)
        )
      })
    }
    
    // Apply expiring soon filter
    if (filters.expiringSoon) {
      filtered = filtered.filter(listing => {
        if (!listing.expiry_date) return false
        const expiryDate = new Date(listing.expiry_date)
        const now = new Date()
        const diffHours = (expiryDate - now) / (1000 * 60 * 60)
        return diffHours < 24 && diffHours > 0
      })
    }
    
    set({ filteredListings: filtered })
  },
  
  addListing: async (listingData) => {
    try {
      set({ loading: true, error: null })
      
      const { data, error } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
      
      if (error) throw error
      
      // Refresh listings
      await get().fetchListings()
      
      return data
    } catch (error) {
      console.error('Error adding listing:', error)
      set({ error: error.message, loading: false })
      throw error
    }
  },
  
  updateListing: async (id, listingData) => {
    try {
      set({ loading: true, error: null })
      
      const { data, error } = await supabase
        .from('listings')
        .update(listingData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      
      // Refresh listings
      await get().fetchListings()
      
      return data
    } catch (error) {
      console.error('Error updating listing:', error)
      set({ error: error.message, loading: false })
      throw error
    }
  },
  
  deleteListing: async (id) => {
    try {
      set({ loading: true, error: null })
      
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh listings
      await get().fetchListings()
      
      return true
    } catch (error) {
      console.error('Error deleting listing:', error)
      set({ error: error.message, loading: false })
      throw error
    }
  }
}))

export default useListingStore
