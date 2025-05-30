So tomorrow we can look at those houses. Are we gonna hear hun? It's only 1000 per feet. . Yeah, that's not good for Xander because. I don't know how to lay out there, so go back up and down the stick. import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  User, 
  Settings, 
  CreditCard, 
  Heart, 
  LogOut, 
  Bell, 
  Calendar, 
  ChevronRight,
  Star,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Mock data for orders
  const orders = [
    {
      id: 'ORD-1234',
      date: '2023-09-15',
      business: 'Green Grocer',
      items: [
        { name: 'Organic Vegetable Box', quantity: 1, price: 9.99 }
      ],
      status: 'completed',
      total: 9.99
    },
    {
      id: 'ORD-1235',
      date: '2023-09-10',
      business: 'Sunshine Bakery',
      items: [
        { name: 'Bakery Surprise Box', quantity: 1, price: 7.99 }
      ],
      status: 'completed',
      total: 7.99
    },
    {
      id: 'ORD-1236',
      date: '2023-09-05',
      business: 'Urban Deli',
      items: [
        { name: 'Deli Sandwich Pack', quantity: 1, price: 6.49 }
      ],
      status: 'completed',
      total: 6.49
    }
  ];
  
  // Mock data for saved items
  const savedItems = [
    {
      id: 1,
      title: "Organic Vegetable Box",
      business: "Green Grocer",
      image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 24.99,
      discountPrice: 9.99,
      discount: 60,
      timeLeft: "3 hours",
      distance: "0.8 miles"
    },
    {
      id: 2,
      title: "Bakery Surprise Box",
      business: "Sunshine Bakery",
      image: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      originalPrice: 18.50,
      discountPrice: 7.99,
      discount: 57,
      timeLeft: "5 hours",
      distance: "1.2 miles"
    }
  ];
  
  // Mock data for user profile
  const profile = {
    name: user?.email?.split('@')[0] || 'User',
    email: user?.email || 'user@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Green Street, Eco City, EC 12345',
    savedAmount: 24.47,
    co2Saved: 3.2,
    joinDate: '2023-08-01'
  };
  
  // Calculate days since joining
  const calculateDaysSinceJoining = () => {
    const joinDate = new Date(profile.joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              {/* User info */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-xl">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Saved</p>
                    <p className="text-lg font-bold text-primary-600">${profile.savedAmount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">CO₂ Saved</p>
                    <p className="text-lg font-bold text-green-600">{profile.co2Saved} kg</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'orders' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      <span className="font-medium">My Orders</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('saved')}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'saved' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className="h-5 w-5 mr-3" />
                      <span className="font-medium">Saved Items</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'profile' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <User className="h-5 w-5 mr-3" />
                      <span className="font-medium">Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'settings' 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      <span className="font-medium">Settings</span>
                    </button>
                  </li>
                </ul>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button
                    onClick={signOut}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
                    <p className="text-gray-600 text-sm">View and manage your orders</p>
                  </div>
                  
                  {orders.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                              <div className="flex items-center mt-1">
                                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-600">
                                  {new Date(order.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className={`badge ${
                                order.status === 'completed' ? 'badge-green' : 
                                order.status === 'pending' ? 'badge-yellow' : 'badge-red'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{order.business}</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              </div>
                            </div>
                            
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between py-2">
                                <div className="flex items-start">
                                  <div className="h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center mr-3">
                                    <ShoppingBag className="h-4 w-4 text-primary-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  ${item.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total</span>
                            <span className="text-lg font-bold text-primary-600">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <button className="btn btn-secondary btn-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="h-16 w-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't placed any orders yet. Start browsing to find great deals!
                      </p>
                      <button className="btn btn-primary">
                        Browse Listings
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Saved Items Tab */}
            {activeTab === 'saved' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Saved Items</h2>
                    <p className="text-gray-600 text-sm">Items you've saved for later</p>
                  </div>
                  
                  {savedItems.length > 0 ? (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedItems.map((item) => (
                        <div key={item.id} className="card hover-card-rise">
                          <div className="relative h-40">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 badge badge-green">
                              {item.discount}% OFF
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">by {item.business}</p>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-xs font-medium text-gray-500 line-through mr-2">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                                <span className="text-lg font-bold text-primary-600">
                                  ${item.discountPrice.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {item.timeLeft} left
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-1" />
                                {item.distance}
                              </div>
                              <button className="btn btn-primary btn-sm">
                                Reserve
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="h-16 w-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Heart className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved items</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't saved any items yet. Browse listings and click the heart icon to save items for later.
                      </p>
                      <button className="btn btn-primary">
                        Browse Listings
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
                    <p className="text-gray-600 text-sm">Manage your personal information</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-center mb-8">
                      <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center mb-4 sm:mb-0">
                        <span className="text-primary-700 font-bold text-3xl">
                          {profile.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="sm:ml-6 text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h3>
                        <p className="text-gray-600 mb-2">{profile.email}</p>
                        <p className="text-sm text-gray-500">
                          Member for {calculateDaysSinceJoining()} days
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                            <Leaf className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">Environmental Impact</h4>
                        </div>
                        <p className="text-2xl font-bold text-green-600 mb-1">{profile.co2Saved} kg</p>
                        <p className="text-sm text-gray-600">CO₂ emissions saved</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                            <DollarSign className="h-5 w-5 text-primary-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">Money Saved</h4>
                        </div>
                        <p className="text-2xl font-bold text-primary-600 mb-1">${profile.savedAmount}</p>
                        <p className="text-sm text-gray-600">Total savings</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                            <ShoppingBag className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">Orders</h4>
                        </div>
                        <p className="text-2xl font-bold text-blue-600 mb-1">{orders.length}</p>
                        <p className="text-sm text-gray-600">Completed orders</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={profile.name}
                              className="input"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={profile.email}
                              className="input"
                              readOnly
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={profile.phone}
                              className="input"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address
                            </label>
                            <input
                              type="text"
                              value={profile.address}
                              className="input"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary">
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                    <p className="text-gray-600 text-sm">Manage your account settings and preferences</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-600">Receive email updates about your orders and promotions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Push Notifications</h4>
                            <p className="text-sm text-gray-600">Receive push notifications for order updates and new deals</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Location Services</h4>
                            <p className="text-sm text-gray-600">Allow access to your location to find nearby deals</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Visa ending in 4242</h4>
                              <p className="text-sm text-gray-600">Expires 12/2025</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="badge badge-green mr-2">Default</span>
                            <button className="text-gray-400 hover:text-gray-500">
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <button className="flex items-center p-4 border border-dashed border-gray-300 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors w-full">
                          <Plus className="h-5 w-5 mr-2" />
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                      
                      <div className="space-y-4">
                        <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg w-full text-left hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-medium text-gray-900">Change Password</h4>
                            <p className="text-sm text-gray-600">Update your password for better security</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                        
                        <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg w-full text-left hover:bg-gray-50 transition-colors">
                          <div>
                            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <button className="text-red-600 hover:text-red-700 font-medium">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
