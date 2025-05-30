import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useListingStore = create((set, get) => ({
  listings: [],
  filteredListings: [],
  loading: false,
  error: null,
  
  filters: {
    category: null,
    dietary_info: [],
    priceRange: null,
    location: null,
    sortBy: 'newest'
  },
  
  categories: [
    'Bakery',
    'Produce',
    'Dairy',
    'Prepared Meals',
    'Pantry Items',
    'Meat & Seafood',
    'Beverages',
    'Snacks',
    'Other'
  ],
  
  dietaryOptions: [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Organic',
    'Halal',
    'Kosher'
  ],
  
  priceRanges: [
    { value: 'free', label: 'Free Only' },
    { value: 'under5', label: 'Under $5' },
    { value: '5to10', label: '$5 to $10' },
    { value: 'over10', label: 'Over $10' }
  ],
  
  sortOptions: [
    { value: 'newest', label: 'Newest First' },
    { value: 'expiringSoon', label: 'Expiring Soon' },
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' }
  ],
  
  fetchListings: async () => {
    set({ loading: true, error: null })
    
    try {
      // In a real app, this would be a Supabase query
      // For now, we'll use mock data
      const mockListings = [
        {
          id: 1,
          title: "Fresh Bakery Bundle",
          description: "Assortment of fresh bread, pastries, and cookies from our bakery.",
          price: 5.99,
          location: "Downtown Bakery, 123 Main St",
          category: "Bakery",
          dietary_info: ["Vegetarian"],
          images: ["https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
          created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          profiles: {
            name: "Downtown Bakery",
            avatar_url: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        },
        {
          id: 2,
          title: "Organic Produce Box",
          description: "Mix of seasonal organic vegetables and fruits.",
          price: 8.50,
          location: "Green Farm Market, 456 Oak Ave",
          category: "Produce",
          dietary_info: ["Organic", "Vegan", "Gluten-Free"],
          images: ["https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
          created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          profiles: {
            name: "Green Farm Market",
            avatar_url: "https://images.pexels.com/photos/5273044/pexels-photo-5273044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        },
        {
          id: 3,
          title: "Restaurant Meal Kit",
          description: "Ready-to-heat gourmet pasta dinner for two with garlic bread.",
          price: 12.99,
          location: "Bella's Italian, 789 Elm St",
          category: "Prepared Meals",
          dietary_info: ["Vegetarian"],
          images: ["https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
          created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
          profiles: {
            name: "Bella's Italian",
            avatar_url: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        },
        {
          id: 4,
          title: "Surplus Dairy Bundle",
          description: "Assortment of yogurt, cheese, and milk approaching best-by date.",
          price: 0,
          location: "Community Grocery, 101 Pine St",
          category: "Dairy",
          dietary_info: ["Vegetarian"],
          images: ["https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 21600000).toISOString(), // 6 hours from now
          created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
          profiles: {
            name: "Community Grocery",
            avatar_url: null
          }
        },
        {
          id: 5,
          title: "Artisan Bread Selection",
          description: "Assortment of freshly baked artisan breads including sourdough, baguette, and ciabatta.",
          price: 7.50,
          location: "Artisan Bakery, 202 Maple Ave",
          category: "Bakery",
          dietary_info: ["Vegetarian"],
          images: ["https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
          created_at: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
          profiles: {
            name: "Artisan Bakery",
            avatar_url: "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        },
        {
          id: 6,
          title: "Vegan Meal Prep Pack",
          description: "Three days worth of plant-based meals, ready to heat and eat.",
          price: 15.99,
          location: "Green Kitchen, 303 Cedar St",
          category: "Prepared Meals",
          dietary_info: ["Vegan", "Gluten-Free", "Organic"],
          images: ["https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 259200000).toISOString(), // 72 hours from now
          created_at: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
          profiles: {
            name: "Green Kitchen",
            avatar_url: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        },
        {
          id: 7,
          title: "Surplus Pantry Items",
          description: "Collection of canned goods, pasta, and other non-perishable items.",
          price: 0,
          location: "Food Bank Distribution Center, 404 Birch St",
          category: "Pantry Items",
          dietary_info: [],
          images: ["https://images.pexels.com/photos/6697295/pexels-photo-6697295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 2592000000).toISOString(), // 30 days from now
          created_at: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
          profiles: {
            name: "Community Food Bank",
            avatar_url: null
          }
        },
        {
          id: 8,
          title: "Fresh Fruit Basket",
          description: "Seasonal fruits including apples, oranges, and berries.",
          price: 9.99,
          location: "Fresh Market, 505 Walnut St",
          category: "Produce",
          dietary_info: ["Organic", "Vegan", "Gluten-Free"],
          images: ["https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
          created_at: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
          profiles: {
            name: "Fresh Market",
            avatar_url: "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        }
      ];
      
      set({ 
        listings: mockListings,
        filteredListings: mockListings,
        loading: false 
      })
      
      // Apply any existing filters
      get().applyFilters()
    } catch (error) {
      set({ 
        error: error.message,
        loading: false 
      })
    }
  },
  
  setFilter: (key, value) => {
    set(state => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }))
    
    get().applyFilters()
  },
  
  resetFilters: () => {
    set({
      filters: {
        category: null,
        dietary_info: [],
        priceRange: null,
        location: null,
        sortBy: 'newest'
      }
    })
    
    get().applyFilters()
  },
  
  applyFilters: () => {
    const { listings, filters } = get()
    
    let filtered = [...listings]
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(listing => listing.category === filters.category)
    }
    
    // Apply dietary filter
    if (filters.dietary_info && filters.dietary_info.length > 0) {
      filtered = filtered.filter(listing => {
        if (!listing.dietary_info) return false
        return filters.dietary_info.every(diet => listing.dietary_info.includes(diet))
      })
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'free':
          filtered = filtered.filter(listing => listing.price === 0)
          break
        case 'under5':
          filtered = filtered.filter(listing => listing.price > 0 && listing.price < 5)
          break
        case '5to10':
          filtered = filtered.filter(listing => listing.price >= 5 && listing.price <= 10)
          break
        case 'over10':
          filtered = filtered.filter(listing => listing.price > 10)
          break
        default:
          break
      }
    }
    
    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase()
      filtered = filtered.filter(listing => 
        listing.location && listing.location.toLowerCase().includes(locationLower)
      )
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
      case 'expiringSoon':
        filtered.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date))
        break
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    
    set({ filteredListings: filtered })
  }
}))

export default useListingStore
