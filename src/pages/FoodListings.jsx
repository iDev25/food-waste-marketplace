import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, MapPin, Star, ChevronDown, ShoppingBag } from 'lucide-react';

const FoodListings = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for food listings
  const listings = [
    {
      id: 1,
      title: "Organic Vegetable Box",
      business: "Green Grocer",
      businessRating: 4.8,
      category: "grocery",
      image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 24.99,
      discountPrice: 9.99,
      discount: 60,
      timeLeft: "3 hours",
      distance: 0.8,
      description: "A box of fresh organic vegetables including carrots, potatoes, onions, and seasonal greens."
    },
    {
      id: 2,
      title: "Bakery Surprise Box",
      business: "Sunshine Bakery",
      businessRating: 4.7,
      category: "bakery",
      image: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 18.50,
      discountPrice: 7.99,
      discount: 57,
      timeLeft: "5 hours",
      distance: 1.2,
      description: "A selection of freshly baked goods including bread, pastries, and cookies."
    },
    {
      id: 3,
      title: "Deli Sandwich Pack",
      business: "Urban Deli",
      businessRating: 4.5,
      category: "prepared",
      image: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 15.99,
      discountPrice: 6.49,
      discount: 59,
      timeLeft: "2 hours",
      distance: 0.5,
      description: "Pack of 3 gourmet sandwiches with various fillings. Perfect for lunch or a quick dinner."
    },
    {
      id: 4,
      title: "Fruit Basket",
      business: "Fresh Market",
      businessRating: 4.9,
      category: "grocery",
      image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 19.99,
      discountPrice: 8.99,
      discount: 55,
      timeLeft: "4 hours",
      distance: 1.5,
      description: "Assortment of seasonal fruits including apples, oranges, bananas, and berries."
    },
    {
      id: 5,
      title: "Sushi Platter",
      business: "Ocean Sushi",
      businessRating: 4.6,
      category: "prepared",
      image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 29.99,
      discountPrice: 14.99,
      discount: 50,
      timeLeft: "1 hour",
      distance: 2.0,
      description: "Mixed sushi platter with various rolls, nigiri, and sashimi. Includes soy sauce and wasabi."
    },
    {
      id: 6,
      title: "Artisan Bread Selection",
      business: "Craft Bakery",
      businessRating: 4.8,
      category: "bakery",
      image: "https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 16.99,
      discountPrice: 7.49,
      discount: 56,
      timeLeft: "6 hours",
      distance: 1.8,
      description: "Selection of artisan sourdough, whole grain, and specialty breads baked fresh today."
    },
    {
      id: 7,
      title: "Pasta Meal Kit",
      business: "Italian Corner",
      businessRating: 4.7,
      category: "prepared",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 22.99,
      discountPrice: 9.99,
      discount: 57,
      timeLeft: "3 hours",
      distance: 1.1,
      description: "Fresh pasta with homemade sauce and ingredients to make a complete Italian dinner for two."
    },
    {
      id: 8,
      title: "Dairy Bundle",
      business: "Green Grocer",
      businessRating: 4.8,
      category: "grocery",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 17.99,
      discountPrice: 8.49,
      discount: 53,
      timeLeft: "5 hours",
      distance: 0.8,
      description: "Selection of dairy products including milk, cheese, yogurt, and butter approaching best-by date."
    },
    {
      id: 9,
      title: "Dessert Box",
      business: "Sweet Treats",
      businessRating: 4.9,
      category: "bakery",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 24.99,
      discountPrice: 10.99,
      discount: 56,
      timeLeft: "2 hours",
      distance: 1.3,
      description: "Assortment of premium desserts including cakes, tarts, and pastries from our daily selection."
    }
  ];
  
  // Filter listings based on active filter and search query
  const filteredListings = listings.filter(listing => {
    const matchesCategory = activeFilter === 'all' || listing.category === activeFilter;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          listing.business.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sort listings based on selected sort option
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.discountPrice - b.discountPrice;
      case 'price-high':
        return b.discountPrice - a.discountPrice;
      case 'discount':
        return b.discount - a.discount;
      case 'distance':
        return a.distance - b.distance;
      case 'time':
        return a.timeLeft.localeCompare(b.timeLeft);
      default: // recommended
        return 0; // Keep original order
    }
  });
  
  return (
    <div className="pt-20 pb-16">
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-display mb-4">Browse Food Listings</h1>
          <p className="text-primary-100 max-w-3xl">
            Discover discounted food from local businesses that would otherwise go to waste. 
            Save money while helping reduce food waste in your community.
          </p>
          
          {/* Search bar */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for food or businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 md:hidden"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <p className="text-gray-600 text-sm">
                Showing <span className="font-medium">{sortedListings.length}</span> results
              </p>
            </div>
            
            <div className={`md:flex space-x-2 ${showFilters ? 'flex flex-wrap gap-2' : 'hidden'}`}>
              {['all', 'grocery', 'bakery', 'prepared'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All Categories' : 
                   filter === 'grocery' ? 'Grocery' : 
                   filter === 'bakery' ? 'Bakery' : 'Prepared Meals'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="distance">Nearest</option>
              <option value="time">Time Remaining</option>
            </select>
          </div>
        </div>
        
        {/* Listings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="card overflow-hidden hover-card-rise"
            >
              <div className="relative h-48">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 badge badge-green">
                  {listing.discount}% OFF
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="heading-4 mb-1">{listing.title}</h3>
                  <span className={`badge ${
                    listing.category === 'grocery' ? 'bg-blue-100 text-blue-800' : 
                    listing.category === 'bakery' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {listing.category === 'grocery' ? 'Grocery' : 
                     listing.category === 'bakery' ? 'Bakery' : 'Prepared'}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <p className="text-gray-600 text-sm">{listing.business}</p>
                  <div className="flex items-center ml-2">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-600 ml-1">{listing.businessRating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 line-through mr-2">
                      ${listing.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      ${listing.discountPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {listing.timeLeft} left
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.distance} miles
                  </div>
                </div>
                <button className="btn btn-primary w-full flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Reserve Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty state */}
        {sortedListings.length === 0 && (
          <div className="text-center py-12">
            <div className="h-20 w-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="heading-3 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any listings matching your search criteria.
            </p>
            <button 
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodListings;
