import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import useListingStore from '../stores/listingStore'
import useMessageStore from '../stores/messageStore'
import { formatDistanceToNow, format } from 'date-fns'
import { MapPin, Clock, User, MessageSquare, AlertTriangle, ChevronLeft, Share2 } from 'lucide-react'

const ListingDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { selectedListing, loading, error, fetchListingById, clearSelectedListing } = useListingStore()
  const { fetchOrCreateConversation } = useMessageStore()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)
  
  useEffect(() => {
    fetchListingById(id)
    
    return () => {
      clearSelectedListing()
    }
  }, [id, fetchListingById, clearSelectedListing])
  
  const handlePrevImage = () => {
    if (!selectedListing?.images || selectedListing.images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === 0 ? selectedListing.images.length - 1 : prev - 1))
  }
  
  const handleNextImage = () => {
    if (!selectedListing?.images || selectedListing.images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === selectedListing.images.length - 1 ? 0 : prev + 1))
  }
  
  const handleContactSeller = () => {
    if (!user) {
      navigate('/login', { state: { from: `/listings/${id}` } })
      return
    }
    
    setIsMessageModalOpen(true)
  }
  
  const handleSendMessage = async () => {
    if (!messageContent.trim() || !user || !selectedListing) return
    
    try {
      setSendingMessage(true)
      
      // Create or fetch conversation
      const conversation = await fetchOrCreateConversation(user.id, selectedListing.supplier_id)
      
      // Send message
      await useMessageStore.getState().sendMessage(
        conversation.id,
        user.id,
        messageContent
      )
      
      // Close modal and navigate to conversation
      setIsMessageModalOpen(false)
      setMessageContent('')
      navigate(`/messages/${conversation.id}`)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSendingMessage(false)
    }
  }
  
  const isExpiringSoon = () => {
    if (!selectedListing?.expiry_date) return false
    const expiryDate = new Date(selectedListing.expiry_date)
    const now = new Date()
    const diffHours = (expiryDate - now) / (1000 * 60 * 60)
    return diffHours < 24 && diffHours > 0
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading listing</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
              <div className="mt-4">
                <Link to="/listings" className="text-sm font-medium text-red-800 hover:text-red-700">
                  Go back to listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!selectedListing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Listing not found</h3>
          <p className="text-gray-600 mb-4">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/listings" className="btn btn-primary">
            Browse other listings
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/listings" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to listings
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Image gallery */}
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-full">
              {selectedListing.images && selectedListing.images.length > 0 ? (
                <>
                  <img 
                    src={selectedListing.images[currentImageIndex]} 
                    alt={selectedListing.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedListing.images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
                      >
                        <ChevronLeft className="h-5 w-5 transform rotate-180" />
                      </button>
                      
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                        {selectedListing.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 w-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Listing details */}
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedListing.title}</h1>
                
                <div className="mt-2 flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{selectedListing.location || 'Location not specified'}</span>
                </div>
              </div>
              
              <div>
                {selectedListing.price === 0 ? (
                  <span className="bg-secondary-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                    Free
                  </span>
                ) : (
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                    ${selectedListing.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                  {selectedListing.category}
                </span>
                
                {selectedListing.dietary_info && selectedListing.dietary_info.map((diet, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {diet}
                  </span>
                ))}
              </div>
            </div>
            
            {selectedListing.expiry_date && (
              <div className={`mt-4 flex items-center ${isExpiringSoon() ? 'text-red-500' : 'text-gray-500'}`}>
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {isExpiringSoon() ? 'Expiring soon: ' : 'Best before: '}
                  {format(new Date(selectedListing.expiry_date), 'PPP')}
                </span>
              </div>
            )}
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">
                {selectedListing.description || 'No description provided.'}
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Quantity Available</h3>
              <p className="mt-2 text-gray-600">
                {selectedListing.quantity} {selectedListing.quantity_unit || 'items'}
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Pickup/Delivery</h3>
              <p className="mt-2 text-gray-600">
                {selectedListing.pickup_delivery || 'Contact supplier for details'}
              </p>
            </div>
            
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                {selectedListing.profiles?.avatar_url ? (
                  <img 
                    className="h-10 w-10 rounded-full object-cover"
                    src={selectedListing.profiles.avatar_url}
                    alt={selectedListing.profiles.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{selectedListing.profiles?.name || 'Anonymous'}</p>
                <p className="text-xs text-gray-500">
                  {selectedListing.profiles?.account_type || 'User'} • 
                  {selectedListing.created_at && ` Listed ${formatDistanceToNow(new Date(selectedListing.created_at), { addSuffix: true })}`}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleContactSeller}
                className="btn btn-primary flex-1 flex items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Supplier
              </button>
              
              <button
                className="btn btn-outline flex-1 flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Message modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Contact {selectedListing.profiles?.name || 'Supplier'}
            </h3>
            
            <div className="mb-4">
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="input"
                placeholder={`Hi, I'm interested in your "${selectedListing.title}" listing...`}
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageContent.trim() || sendingMessage}
                className="btn btn-primary"
              >
                {sendingMessage ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListingDetail
