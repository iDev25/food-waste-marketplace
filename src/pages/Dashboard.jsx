import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import useListingStore from '../stores/listingStore'
import { Plus, Edit, Trash2, AlertTriangle, Clock, Eye, MessageSquare } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { supabase } from '../lib/supabase'

const Dashboard = () => {
  const { user } = useAuth()
  const { listings, loading, error, fetchUserListings, deleteListing } = useListingStore()
  const [activeTab, setActiveTab] = useState('active')
  const [savedListings, setSavedListings] = useState([])
  const [loadingSaved, setLoadingSaved] = useState(false)
  const [conversations, setConversations] = useState([])
  const [loadingConversations, setLoadingConversations] = useState(false)
  const [stats, setStats] = useState({
    activeListings: 0,
    expiredListings: 0,
    savedListings: 0,
    messages: 0
  })
  
  useEffect(() => {
    if (user) {
      fetchUserListings(user.id)
      fetchSavedListings()
      fetchConversations()
    }
  }, [user, fetchUserListings])
  
  useEffect(() => {
    if (listings) {
      const active = listings.filter(listing => {
        if (!listing.expiry_date) return true
        return new Date(listing.expiry_date) > new Date()
      }).length
      
      const expired = listings.filter(listing => {
        if (!listing.expiry_date) return false
        return new Date(listing.expiry_date) <= new Date()
      }).length
      
      setStats(prev => ({
        ...prev,
        activeListings: active,
        expiredListings: expired
      }))
    }
  }, [listings])
  
  const fetchSavedListings = async () => {
    if (!user) return
    
    try {
      setLoadingSaved(true)
      
      // First get the saved listing IDs
      const { data: savedData, error: savedError } = await supabase
        .from('saved_listings')
        .select('listing_id')
        .eq('user_id', user.id)
      
      if (savedError) throw savedError
      
      if (savedData && savedData.length > 0) {
        const listingIds = savedData.map(item => item.listing_id)
        
        // Then fetch the actual listings
        const { data: listingsData, error: listingsError } = await supabase
          .from('listings')
          .select(`
            *,
            profiles:user_id(
              id,
              name,
              avatar_url
            )
          `)
          .in('id', listingIds)
          .order('created_at', { ascending: false })
        
        if (listingsError) throw listingsError
        
        setSavedListings(listingsData || [])
        setStats(prev => ({
          ...prev,
          savedListings: listingsData?.length || 0
        }))
      } else {
        setSavedListings([])
        setStats(prev => ({
          ...prev,
          savedListings: 0
        }))
      }
    } catch (error) {
      console.error('Error fetching saved listings:', error)
    } finally {
      setLoadingSaved(false)
    }
  }
  
  const fetchConversations = async () => {
    if (!user) return
    
    try {
      setLoadingConversations(true)
      
      // Fetch conversations where user is either the buyer or seller
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          listings(*),
          buyer:user_id(id, name, avatar_url),
          seller:seller_id(id, name, avatar_url),
          messages(count)
        `)
        .or(`user_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('updated_at', { ascending: false })
      
      if (error) throw error
      
      setConversations(data || [])
      setStats(prev => ({
        ...prev,
        messages: data?.length || 0
      }))
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoadingConversations(false)
    }
  }
  
  const handleDeleteListing = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      try {
        await deleteListing(id)
      } catch (error) {
        console.error('Error deleting listing:', error)
      }
    }
  }
  
  const removeSavedListing = async (id) => {
    if (!user) return
    
    try {
      const { error } = await supabase
        .from('saved_listings')
        .delete()
        .eq('user_id', user.id)
        .eq('listing_id', id)
      
      if (error) throw error
      
      // Update the local state
      setSavedListings(savedListings.filter(listing => listing.id !== id))
      setStats(prev => ({
        ...prev,
        savedListings: prev.savedListings - 1
      }))
    } catch (error) {
      console.error('Error removing saved listing:', error)
    }
  }
  
  const getFilteredListings = () => {
    if (!listings) return []
    
    if (activeTab === 'active') {
      return listings.filter(listing => {
        if (!listing.expiry_date) return true
        return new Date(listing.expiry_date) > new Date()
      })
    } else if (activeTab === 'expired') {
      return listings.filter(listing => {
        if (!listing.expiry_date) return false
        return new Date(listing.expiry_date) <= new Date()
      })
    }
    
    return listings
  }
  
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const now = new Date()
    const diffHours = (expiry - now) / (1000 * 60 * 60)
    return diffHours < 24 && diffHours > 0
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your listings, saved items, and messages.
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Active Listings</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeListings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Expired Listings</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.expiredListings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Saved Items</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.savedListings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Messages</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.messages}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`${
              activeTab === 'active'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Listings
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`${
              activeTab === 'expired'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Expired Listings
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`${
              activeTab === 'saved'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Saved Items
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`${
              activeTab === 'messages'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Messages
          </button>
        </nav>
      </div>
      
      {/* Add Listing Button */}
      {(activeTab === 'active' || activeTab === 'expired') && (
        <div className="mb-6 flex justify-end">
          <Link to="/create-listing" className="btn btn-primary flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add New Listing
          </Link>
        </div>
      )}
      
      {/* Content based on active tab */}
      {(activeTab === 'active' || activeTab === 'expired') && (
        <>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-700">Error loading listings: {error}</p>
            </div>
          ) : getFilteredListings().length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'active' ? 'No active listings' : 'No expired listings'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'active' 
                  ? 'You don\'t have any active listings yet. Create your first listing to start reducing food waste!'
                  : 'You don\'t have any expired listings.'}
              </p>
              {activeTab === 'active' && (
                <Link to="/create-listing" className="btn btn-primary">
                  Create Your First Listing
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Listing
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredListings().map((listing) => (
                    <tr key={listing.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {listing.images && listing.images.length > 0 ? (
                              <img 
                                className="h-10 w-10 rounded-md object-cover"
                                src={listing.images[0]} 
                                alt={listing.title}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">No img</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {listing.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {listing.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {listing.expiry_date ? (
                          isExpiringSoon(listing.expiry_date) ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Expiring soon
                            </span>
                          ) : new Date(listing.expiry_date) < new Date() ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Expired
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {listing.price === 0 ? 'Free' : `$${listing.price.toFixed(2)}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link 
                            to={`/listings/${listing.id}`}
                            className="text-gray-400 hover:text-gray-500"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          <Link 
                            to={`/edit-listing/${listing.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      
      {/* Saved Listings */}
      {activeTab === 'saved' && (
        <>
          {loadingSaved ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : savedListings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved items</h3>
              <p className="text-gray-600 mb-6">
                You haven't saved any listings yet. Browse listings and save items you're interested in!
              </p>
              <Link to="/listings" className="btn btn-primary">
                Browse Listings
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedListings.map(listing => (
                <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="relative h-48">
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
                    
                    {listing.price === 0 ? (
                      <div className="absolute top-2 right-2 bg-secondary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                        Free
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                        ${listing.price.toFixed(2)}
                      </div>
                    )}
                    
                    {isExpiringSoon(listing.expiry_date) && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Expiring soon
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{listing.title}</h3>
                    
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="truncate">{listing.location || 'Location not specified'}</span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Link 
                        to={`/listings/${listing.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        View Details
                      </Link>
                      
                      <button
                        onClick={() => removeSavedListing(listing.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Remove from saved"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Messages */}
      {activeTab === 'messages' && (
        <>
          {loadingConversations ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : conversations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
              <p className="text-gray-600 mb-6">
                You don't have any conversations yet. Contact sellers or wait for buyers to message you!
              </p>
              <Link to="/listings" className="btn btn-primary">
                Browse Listings
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {conversations.map(conversation => {
                  const isSeller = conversation.seller_id === user.id
                  const otherPerson = isSeller ? conversation.buyer : conversation.seller
                  
                  return (
                    <li key={conversation.id}>
                      <Link 
                        to={`/messages/${conversation.id}`}
                        className="block hover:bg-gray-50"
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                {otherPerson?.avatar_url ? (
                                  <img 
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={otherPerson.avatar_url}
                                    alt={otherPerson.name}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="h-6 w-6 text-gray-500" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {otherPerson?.name || 'Unknown User'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {conversation.listings?.title || 'Unknown Listing'}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {conversation.messages[0]?.count > 0 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  {conversation.messages[0].count}
                                </span>
                              )}
                              <div className="text-sm text-gray-500">
                                {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
