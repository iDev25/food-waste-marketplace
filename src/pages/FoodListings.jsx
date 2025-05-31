import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import ListingCard from '../components/ListingCard'
import ListingFilters from '../components/ListingFilters'
import useListingStore from '../stores/listingStore'

const FoodListings = () => {
  const { filteredListings, loading, error, fetchListings } = useListingStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [displayedListings, setDisplayedListings] = useState([])
  
  useEffect(() => {
    fetchListings()
  }, [fetchListings])
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayedListings(filteredListings)
    } else {
      const lowercasedSearch = searchTerm.toLowerCase()
      const filtered = filteredListings.filter(listing => 
        listing.title.toLowerCase().includes(lowercasedSearch) ||
        (listing.description && listing.description.toLowerCase().includes(lowercasedSearch)) ||
        (listing.category && listing.category.toLowerCase().includes(lowercasedSearch))
      )
      setDisplayedListings(filtered)
    }
  }, [filteredListings, searchTerm])
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Food</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse available food items from local businesses and individuals.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search for food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ListingFilters />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">Error loading listings: {error}</p>
        </div>
      ) : displayedListings.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600">
            {searchTerm ? 
              `No results found for "${searchTerm}". Try a different search term or clear filters.` : 
              'No listings match your current filters. Try adjusting your filters or check back later.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FoodListings
