import { useState, useEffect } from 'react'
import { X, Filter, ChevronDown } from 'lucide-react'
import useListingStore from '../stores/listingStore'

const CATEGORIES = [
  'Produce',
  'Bakery',
  'Dairy',
  'Meat',
  'Prepared Food',
  'Pantry Items',
  'Beverages',
  'Other'
]

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Organic',
  'Halal',
  'Kosher'
]

const ListingFilters = () => {
  const { filters, setFilters, resetFilters } = useListingStore()
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  
  useEffect(() => {
    // Count active filters
    let count = 0
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) count++
    if (filters.categories.length > 0) count++
    if (filters.dietaryOptions.length > 0) count++
    if (filters.freeOnly) count++
    if (filters.expiringSoon) count++
    
    setActiveFilterCount(count)
    setLocalFilters(filters)
  }, [filters])
  
  const handleApplyFilters = () => {
    setFilters(localFilters)
    setIsOpen(false)
  }
  
  const handleResetFilters = () => {
    resetFilters()
    setLocalFilters({
      priceRange: [0, 100],
      categories: [],
      dietaryOptions: [],
      freeOnly: false,
      expiringSoon: false
    })
  }
  
  const toggleCategory = (category) => {
    if (localFilters.categories.includes(category)) {
      setLocalFilters({
        ...localFilters,
        categories: localFilters.categories.filter(c => c !== category)
      })
    } else {
      setLocalFilters({
        ...localFilters,
        categories: [...localFilters.categories, category]
      })
    }
  }
  
  const toggleDietaryOption = (option) => {
    if (localFilters.dietaryOptions.includes(option)) {
      setLocalFilters({
        ...localFilters,
        dietaryOptions: localFilters.dietaryOptions.filter(o => o !== option)
      })
    } else {
      setLocalFilters({
        ...localFilters,
        dietaryOptions: [...localFilters.dietaryOptions, option]
      })
    }
  }
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-outline flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        {activeFilterCount > 0 && (
          <button
            onClick={handleResetFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear all filters
          </button>
        )}
        
        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="w-full mt-2 flex flex-wrap gap-2">
            {filters.freeOnly && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Free Only
                <button 
                  onClick={() => setFilters({...filters, freeOnly: false})}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {filters.expiringSoon && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Expiring Soon
                <button 
                  onClick={() => setFilters({...filters, expiringSoon: false})}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {filters.priceRange[0] > 0 || filters.priceRange[1] < 100 && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button 
                  onClick={() => setFilters({...filters, priceRange: [0, 100]})}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {filters.categories.map(category => (
              <div 
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {category}
                <button 
                  onClick={() => setFilters({
                    ...filters, 
                    categories: filters.categories.filter(c => c !== category)
                  })}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            {filters.dietaryOptions.map(option => (
              <div 
                key={option}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {option}
                <button 
                  onClick={() => setFilters({
                    ...filters, 
                    dietaryOptions: filters.dietaryOptions.filter(o => o !== option)
                  })}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filter Listings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">$0</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    priceRange: [localFilters.priceRange[0], parseInt(e.target.value)]
                  })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-600">${localFilters.priceRange[1]}</span>
              </div>
              
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded"
                    checked={localFilters.freeOnly}
                    onChange={() => setLocalFilters({
                      ...localFilters,
                      freeOnly: !localFilters.freeOnly
                    })}
                  />
                  <span className="ml-2 text-gray-700">Free items only</span>
                </label>
              </div>
            </div>
            
            {/* Expiry */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded"
                    checked={localFilters.expiringSoon}
                    onChange={() => setLocalFilters({
                      ...localFilters,
                      expiringSoon: !localFilters.expiringSoon
                    })}
                  />
                  <span className="ml-2 text-gray-700">Expiring soon (24h)</span>
                </label>
              </div>
            </div>
            
            {/* Categories */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(category => (
                  <label key={category} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                      checked={localFilters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className="ml-2 text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Dietary Options */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Dietary Options</h4>
              <div className="grid grid-cols-2 gap-2">
                {DIETARY_OPTIONS.map(option => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                      checked={localFilters.dietaryOptions.includes(option)}
                      onChange={() => toggleDietaryOption(option)}
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleResetFilters}
              className="btn btn-outline"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListingFilters
