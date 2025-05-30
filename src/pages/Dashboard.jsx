import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Clock, MapPin, Edit, Trash2, User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('myListings');
  const [myListings, setMyListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user's listings
    setTimeout(() => {
      setMyListings([
        {
          id: 1,
          title: "Organic Vegetable Bundle",
          description: "Fresh organic vegetables from my garden. Includes tomatoes, cucumbers, and lettuce.",
          price: 5.99,
          location: "123 Main St",
          category: "Produce",
          images: ["https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
          created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        },
        {
          id: 2,
          title: "Homemade Bread (2 loaves)",
          description: "Freshly baked sourdough bread. Made this morning.",
          price: 3.50,
          location: "123 Main St",
          category: "Bakery",
          images: ["https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
          created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        }
      ]);
      
      setSavedListings([
        {
          id: 3,
          title: "Restaurant Meal Kit",
          description: "Ready-to-heat gourmet pasta dinner for two with garlic bread.",
          price: 12.99,
          location: "Bella's Italian, 789 Elm St",
          category: "Prepared Meals",
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
          images: ["https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          expiry_date: new Date(Date.now() + 21600000).toISOString(), // 6 hours from now
          created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
          profiles: {
            name: "Community Grocery",
            avatar_url: null
          }
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isExpiringSoon = (dateString) => {
    const expiryDate = new Date(dateString);
    const now = new Date();
    const diffHours = (expiryDate - now) / (1000 * 60 * 60);
    return diffHours < 24 && diffHours > 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{user.email}</h2>
                <p className="text-sm text-gray-500">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('myListings')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'myListings' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                }`}
              >
                <ShoppingBag className="mr-3 h-5 w-5 flex-shrink-0" />
                My Listings
              </button>
              
              <button
                onClick={() => setActiveTab('savedListings')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'savedListings' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Saved Listings
              </button>
              
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'messages' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Messages
                <span className="ml-auto inline-block py-0.5 px-2 text-xs rounded-full bg-primary-100 text-primary-800">
                  3
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                }`}
              >
                <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
                Profile Settings
              </button>
            </nav>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-red-700"
              >
                <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Main content */}
        <div className="md:w-3/4">
          {activeTab === 'myListings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
                <button className="btn btn-primary btn-sm flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Listing
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : myListings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't created any food listings yet. Start sharing your surplus food with the community.
                  </p>
                  <button className="btn btn-primary">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Listing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myListings.map(listing => (
                    <div key={listing.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 h-48 md:h-auto">
                          {listing.images && listing.images.length > 0 ? (
                            <img 
                              src={listing.images[0]} 
                              alt={listing.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="p-6 md:w-3/4 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">{listing.title}</h3>
                              <div className="flex items-center text-sm text-gray-500 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{listing.location}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-100">
                                <Edit className="h-5 w-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="badge bg-gray-100 text-gray-800">
                              {listing.category}
                            </span>
                            <span className="badge bg-primary-100 text-primary-800">
                              ${listing.price.toFixed(2)}
                            </span>
                            {isExpiringSoon(listing.expiry_date) && (
                              <span className="badge bg-red-100 text-red-800 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Expiring soon
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-auto flex justify-between items-center text-sm">
                            <span className="text-gray-500">
                              Created: {formatDate(listing.created_at)}
                            </span>
                            <span className="text-gray-500">
                              Expires: {formatDate(listing.expiry_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'savedListings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Saved Listings</h1>
                <Link to="/listings" className="text-primary-600 hover:text-primary-700 flex items-center">
                  Browse more listings
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : savedListings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved listings</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't saved any listings yet. Browse available food and save items you're interested in.
                  </p>
                  <Link to="/listings" className="btn btn-primary">
                    Browse Listings
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedListings.map(listing => (
                    <div key={listing.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                      <div className="relative h-48 w-full">
                        {listing.images && listing.images.length > 0 ? (
                          <img 
                            src={listing.images[0]} 
                            alt={listing.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        
                        <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {listing.price === 0 ? (
                          <div className="absolute top-2 left-2 bg-secondary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                            Free
                          </div>
                        ) : (
                          <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                            ${listing.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{listing.title}</h3>
                        
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="truncate">{listing.location}</span>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {listing.category}
                          </span>
                          
                          {isExpiringSoon(listing.expiry_date) && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Expiring soon
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-between">
                          <span className="text-xs text-gray-500">
                            Expires: {formatDate(listing.expiry_date)}
                          </span>
                          <Link to={`/listings/${listing.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              </div>
              
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Inbox</h3>
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">3 new</span>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">Michael Rodriguez</p>
                          <p className="text-xs text-gray-500">5 min ago</p>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600">Is the Organic Vegetable Bundle still available for pickup today?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                          <p className="text-xs text-gray-500">Yesterday</p>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600">Thank you for the bread! It was delicious. Would you have more available next week?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">Emma Chen</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600">I'm interested in your homemade bread. What time would be convenient for pickup?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              </div>
              
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="p-6">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 input"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 input"
                        value={user.email}
                        disabled
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Your email address cannot be changed.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="mt-1 input"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Default Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className="mt-1 input"
                        placeholder="Your default location for listings"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        id="bio"
                        rows={3}
                        className="mt-1 input"
                        placeholder="Tell others a bit about yourself"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button type="submit" className="btn btn-primary">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
