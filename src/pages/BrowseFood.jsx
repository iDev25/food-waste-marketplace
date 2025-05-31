import { useEffect, useState } from 'react'
import { Search, Filter, MapPin, Clock, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

const BrowseFood = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDistance, setSelectedDistance] = useState('any')
  const [selectedPrice, setSelectedPrice] = useState('any')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Mock data for demonstration
  const mockListings = [
    {
      id: 1,
      title: "Fresh Bakery Bundle",
      description: "Assorted bread, pastries, and cookies from today's bake. Perfect for families.",
      price: 12.99,
      originalPrice: 35.99,
      category: "bakery",
      distance: 1.2,
      expiryDate: "Today",
      image: "https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Downtown Bakery",
      quantity: 1,
      unit: "bundle"
    },
    {
      id: 2,
      title: "Organic Vegetable Box",
      description: "Mix of seasonal organic vegetables. Slightly blemished but perfectly edible.",
      price: 8.50,
      originalPrice: 24.99,
      category: "produce",
      distance: 0.8,
      expiryDate: "3 days",
      image: "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Green Market",
      quantity: 1,
      unit: "box"
    },
    {
      id: 3,
      title: "Prepared Meals - Vegan",
      description: "3 vegan prepared meals from our kitchen. Nutritious and delicious.",
      price: 15.00,
      originalPrice: 36.00,
      category: "prepared",
      distance: 2.5,
      expiryDate: "Tomorrow",
      image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Sunshine Cafe",
      quantity: 3,
      unit: "meals"
    },
    {
      id: 4,
      title: "Dairy Bundle",
      description: "Assorted yogurt, milk, and cheese approaching best-by date. All sealed and fresh.",
      price: 9.99,
      originalPrice: 22.50,
      category: "dairy",
      distance: 1.5,
      expiryDate: "2 days",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Family Grocery",
      quantity: 1,
      unit: "bundle"
    },
    {
      id: 5,
      title: "Fruit Basket - Mixed Seasonal",
      description: "Variety of seasonal fruits. Some with minor blemishes but perfectly good to eat.",
      price: 7.50,
      originalPrice: 18.99,
      category: "produce",
      distance: 3.2,
      expiryDate: "4 days",
      image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Harvest Market",
      quantity: 1,
      unit: "basket"
    },
    {
      id: 6,
      title: "Restaurant Surplus - Italian",
      description: "Pasta, sauce, and bread from today's service. Enough for 2-3 people.",
      price: 14.99,
      originalPrice: 45.00,
      category: "prepared",
      distance: 0.5,
      expiryDate: "Today",
      image: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Bella Italia",
      quantity: 1,
      unit: "meal kit"
    },
    {
      id: 7,
      title: "Pantry Staples Bundle",
      description: "Rice, pasta, canned goods, and more. All with at least 1 month until expiration.",
      price: 18.50,
      originalPrice: 32.99,
      category: "pantry",
      distance: 4.1,
      expiryDate: "30+ days",
      image: "https://images.pexels.com/photos/6697295/pexels-photo-6697295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Community Store",
      quantity: 1,
      unit: "box"
    },
    {
      id: 8,
      title: "Artisan Bread Selection",
      description: "Assortment of today's artisan breads. Perfect for freezing.",
      price: 6.99,
      originalPrice: 16.50,
      category: "bakery",
      distance: 1.8,
      expiryDate: "Today",
      image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Artisan Bakehouse",
      quantity: 4,
      unit: "loaves"
    },
    {
      id: 9,
      title: "Free - Community Garden Surplus",
      description: "Extra vegetables from our community garden. First come, first served.",
      price: 0,
      originalPrice: 0,
      category: "produce",
      distance: 2.0,
      expiryDate: "2 days",
      image: "https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      location: "Green Thumb Garden",
      quantity: 1,
      unit: "bag"
    }
  ]
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockListings)
      setLoading(false)
    }, 800)
  }, [])
  
  const filterListings = () => {
    let filtered = [...mockListings]
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(term) || 
        listing.description.toLowerCase().includes(term) ||
        listing.location.toLowerCase().includes(term)
      )
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(listing => listing.category === selectedCategory)
    }
    
    // Filter by distance
    if (selectedDistance !== 'any') {
      const maxDistance = parseFloat(selectedDistance)
      filtered = filtered.filter(listing => listing.distance <= maxDistance)
    }
    
    // Filter by price
    if (selectedPrice !== 'any') {
      if (selectedPrice === 'free') {
        filtered = filtered.filter(listing => listing.price === 0)
      } else if (selectedPrice === 'under5') {
        filtered = filtered.filter(listing => listing.price > 0 && listing.price < 5)
      } else if (selectedPrice === '5to15') {
        filtered = filtered.filter(listing => listing.price >= 5 && listing.price <= 15)
      } else if (selectedPrice === 'over15') {
        filtered = filtered.filter(listing => listing.price > 15)
      }
    }
    
    return filtered
  }
  
  const filteredListings = filterListings()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Food</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find surplus food from local businesses, restaurants, and community members.
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search for food items, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="bakery">Bakery</option>
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="prepared">Prepared Meals</option>
              <option value="pantry">Pantry Items</option>
            </select>
            
            <select
              className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
            >
              <option value="any">Any Distance</option>
              <option value="1">Under 1 mile</option>
              <option value="2">Under 2 miles</option>
              <option value="5">Under 5 miles</option>
              <option value="10">Under 10 miles</option>
            </select>
            
            <select
              className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
            >
              <option value="any">Any Price</option>
              <option value="free">Free</option>
              <option value="under5">Under $5</option>
              <option value="5to15">$5 - $15</option>
              <option value="over15">Over $15</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
            <Filter className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No listings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria to find more results.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedDistance('any')
                setSelectedPrice('any')
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Reset filters
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">Showing {filteredListings.length} results</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                  />
                  {listing.price === 0 && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-sm font-medium">
                      FREE
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
                    <div className="flex items-center">
                      {listing.price > 0 ? (
                        <div>
                          <span className="text-lg font-bold text-primary-600">${listing.price.toFixed(2)}</span>
                          <span className="ml-1 text-sm text-gray-500 line-through">${listing.originalPrice.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-green-600">FREE</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{listing.description}</p>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{listing.location} ({listing.distance} mi)</span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Best before: {listing.expiryDate}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{listing.quantity} {listing.unit}</span>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <Link
                      to={`/listings/${listing.id}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View details
                    </Link>
                    <button
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {/* Tips section */}
      <div className="mt-12 bg-primary-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary-800 mb-4">Tips for Finding Food</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-primary-700 mb-2">Best Times to Look</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Restaurants often list surplus after lunch (2-4pm) and dinner (9-10pm)</li>
              <li>• Bakeries typically post items in the evening (7-9pm)</li>
              <li>• Grocery stores update listings throughout the day</li>
              <li>• Weekend mornings often have more community garden listings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-primary-700 mb-2">Food Safety</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check expiration dates carefully</li>
              <li>• Ask about storage conditions if unsure</li>
              <li>• Bring appropriate containers for transport</li>
              <li>• Refrigerate perishable items promptly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseFood
