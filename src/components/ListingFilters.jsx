import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import useListingStore from '../stores/listingStore'

const CATEGORIES = [
  'Produce', 
  'Bakery', 
  'Dairy', 
  'Meat', 
  'Prepared Meals', 
  'Pantry Items', 
  'Beverages'
]

const DIETARY_OPTIONS = [
  'Vegetarian', 
  'Vegan', 
  'Gluten-Free', 
  'Dairy-Free', 
  'Nut-Free', 
  'Organic'
]

const ListingFilters = () => {
  const { filters, setFilters, resetFilters } = useListingStore()
  const [isOpen, setIsOpen] = useState(false)
  
  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    setFilters({
      ...filters,
      categories: updatedCategories
    })
  }
  
  const handleDietaryChange = (option) => {
    const updatedOptions = filters.dietaryOptions.includes(option)
      ? filters.dietaryOptions.filter(o => o !== option)
      : [...filters.dietaryOptions, option]
    
    setFilters({
      ...filters,
      dietaryOptions: updatedOptions
    })
  }
  
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    setFilters({
      ...filters,
      priceRange: [0, value]
    })
  }
  
  const handleFreeOnlyChange = (e) => {
    setFilters({
      ...filters,
      freeOnly: e.target.checked
    })
  }
  
  const handleExpiringSoonChange = (e) => {
    setFilters({
      ...filters,
      expiringSoon: e.target.checked
    })
  }
  
  const hasActiveFilters = () => {
    return (
      filters.categories.length > 0 ||
      filters.dietaryOptions.length > 0 ||
      filters.priceRange[1] < 100 ||
      filters.freeOnly ||
      filters.expiringSoon
    )
  }
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-gray-700 hover:text-primary-600"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters() && (
            <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters() && (
          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    checked={filters.freeOnly}
                    onChange={handleFreeOnlyChange}
                  />
                  <span className="ml-2 text-sm text-gray-700">Free items only</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-700 mb-1">
                  Max Price: ${filters.priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={filters.priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={filters.freeOnly}
                />
              </div>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Dietary Options & Other Filters */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Dietary Options</h3>
              <div className="space-y-2">
                {DIETARY_OPTIONS.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      checked={filters.dietaryOptions.includes(option)}
                      onChange={() => handleDietaryChange(option)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              
              <h3 className="font-medium text-gray-900 mt-4 mb-2">Other Filters</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  checked={filters.expiringSoon}
                  onChange={handleExpiringSoonChange}
                />
                <span className="ml-2 text-sm text-gray-700">Expiring Soon</span>
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Active filters display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.freeOnly && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
              Free Only
              <button 
                onClick={() => setFilters({...filters, freeOnly: false})}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.priceRange[1] < 100 && !filters.freeOnly && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
              Max ${filters.priceRange[1]}
              <button 
                onClick={() => setFilters({...filters, priceRange: [0, 100]})}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.expiringSoon && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
              Expiring Soon
              <button 
                onClick={() => setFilters({...filters, expiringSoon: false})}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.categories.map(category => (
            <span key={category} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
              {category}
              <button 
                onClick={() => handleCategoryChange(category)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          
          {filters.dietaryOptions.map(option => (
            <span key={option} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
              {option}
              <button 
                onClick={() => handleDietaryChange(option)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListingFilters
