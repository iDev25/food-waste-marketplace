import { useState } from 'react'
import { X, Filter, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useListingStore from '../stores/listingStore'

const ListingFilters = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    filters, 
    setFilter, 
    resetFilters,
    categories,
    dietaryOptions,
    priceRanges,
    sortOptions
  } = useListingStore()
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-gray-700 hover:text-primary-600 font-medium"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {Object.values(filters).some(value => 
          value !== null && value !== '' && 
          (Array.isArray(value) ? value.length > 0 : true)
        ) && (
          <button 
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all filters
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-4 rounded-xl shadow-soft mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => setFilter('category', e.target.value || null)}
                    className="input"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Dietary preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Preferences
                  </label>
                  <div className="space-y-2">
                    {dietaryOptions.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          id={`diet-${option}`}
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={filters.dietary_info?.includes(option) || false}
                          onChange={(e) => {
                            const currentDietary = filters.dietary_info || []
                            if (e.target.checked) {
                              setFilter('dietary_info', [...currentDietary, option])
                            } else {
                              setFilter('dietary_info', currentDietary.filter(item => item !== option))
                            }
                          }}
                        />
                        <label htmlFor={`diet-${option}`} className="ml-2 text-sm text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange || ''}
                    onChange={(e) => setFilter('priceRange', e.target.value || null)}
                    className="input"
                  >
                    <option value="">Any Price</option>
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Sort by */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy || 'newest'}
                    onChange={(e) => setFilter('sortBy', e.target.value)}
                    className="input"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Location filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city, neighborhood, or zip code"
                  value={filters.location || ''}
                  onChange={(e) => setFilter('location', e.target.value || null)}
                  className="input"
                />
              </div>
              
              {/* Active filters */}
              {Object.values(filters).some(value => 
                value !== null && value !== '' && 
                (Array.isArray(value) ? value.length > 0 : true)
              ) && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {filters.category && (
                      <FilterBadge 
                        label={`Category: ${filters.category}`}
                        onRemove={() => setFilter('category', null)}
                      />
                    )}
                    
                    {filters.dietary_info && filters.dietary_info.map(diet => (
                      <FilterBadge 
                        key={diet}
                        label={diet}
                        onRemove={() => {
                          setFilter('dietary_info', filters.dietary_info.filter(item => item !== diet))
                        }}
                      />
                    ))}
                    
                    {filters.priceRange && (
                      <FilterBadge 
                        label={`Price: ${priceRanges.find(r => r.value === filters.priceRange)?.label}`}
                        onRemove={() => setFilter('priceRange', null)}
                      />
                    )}
                    
                    {filters.location && (
                      <FilterBadge 
                        label={`Location: ${filters.location}`}
                        onRemove={() => setFilter('location', null)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FilterBadge = ({ label, onRemove }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
    {label}
    <button 
      type="button" 
      onClick={onRemove}
      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:text-primary-600 focus:outline-none"
    >
      <X className="h-3 w-3" />
    </button>
  </span>
)

export default ListingFilters
