import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { formatDistanceToNow, format } from 'date-fns'
import { MapPin, Clock, AlertTriangle, MessageSquare, Heart, Share2, ArrowLeft, User } from 'lucide-react'

const ListingDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [relatedListings, setRelatedListings] = useState([])
  
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('listings')
          .select(`
            *,
            profiles:user_id(
              id,
              name,
              avatar_url
            )
          `)
          .eq('id', id)
          .single()
        
        if (error) throw error
        
        setListing(data)
        
        // Check if user has saved this listing
        if (user) {
          const { data: savedData } = await supabase
            .from('saved_listings')
            .select('*')
            .eq('user_id', user.id)
            .eq('listing_id', id)
            .single()
          
          setIsSaved(!!savedData)
        }
        
        // Fetch related listings (same category)
        if (data) {
          const { data: relatedData } = await supabase
            .from('listings')
            .select(`
              *,
              profiles:user_id(
                name,
                avatar_url
              )
            `)
            .eq('category', data.category)
            .neq('id', id)
            .limit(3)
          
          setRelatedListings(relatedData || [])
        }
      } catch (error) {
        console.error('Error fetching listing:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchListing()
  }, [id, user])
  
  const toggleSave = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/listings/${id}` } })
      return
    }
    
    try {
      if (isSaved) {
        // Remove from saved
        await supabase
          .from('saved_listings')
          .delete()
          .eq('user_id', user.id)
          .eq('listing_id', id)
      } else {
        // Add to saved
        await supabase
          .from('saved_listings')
          .insert({
            user_id: user.id,
            listing_id: id
          })
      }
      
      setIsSaved(!isSaved)
    } catch (error) {
      console.error('Error toggling save:', error)
    }
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out this food listing: ${listing.title}`,
        url: window.location.href
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }
  
  const startConversation = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/listings/${id}` } })
      return
    }
    
    try {
      // Check if conversation already exists
      const { data: existingConvo } = await supabase
        .from('conversations')
        .select('id')
        .eq('listing_id', id)
        .eq('user_id', user.id)
        .single()
      
      if (existingConvo) {
        navigate(`/messages/${existingConvo.id}`)
        return
      }
      
      // Create new conversation
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          listing_id: id,
          user_id: user.id,
          seller_id: listing.user_id
        })
        .select()
        .single()
      
      if (error) throw error
      
      navigate(`/messages/${data.id}`)
    } catch (error) {
      console.error('Error starting conversation:', error)
    }
  }
  
  const nextImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((currentImageIndex + 1) % listing.images.length)
    }
  }
  
  const prevImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((currentImageIndex - 1 + listing.images.length) % listing.images.length)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <h2 className="text-lg font-medium text-red-800">Error</h2>
          <p className="mt-2 text-red-700">{error}</p>
          <Link to="/listings" className="mt-4 inline-flex items-center text-red-600 hover:text-red-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to listings
          </Link>
        </div>
      </div>
    )
  }
  
  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 p-4 rounded-md">
          <h2 className="text-lg font-medium text-yellow-800">Listing not found</h2>
          <p className="mt-2 text-yellow-700">The listing you're looking for doesn't exist or has been removed.</p>
          <Link to="/listings" className="mt-4 inline-flex items-center text-yellow-600 hover:text-yellow-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to listings
          </Link>
        </div>
      </div>
    )
  }
  
  const isExpired = listing.expiry_date && new Date(listing.expiry_date) < new Date()
  const isExpiringSoon = listing.expiry_date && !isExpired && 
    (new Date(listing.expiry_date) - new Date()) / (1000 * 60 * 60) < 24
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/listings" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to listings
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images and details */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100 h-96">
            {listing.images && listing.images.length > 0 ? (
              <>
                <img 
                  src={listing.images[currentImageIndex]} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                
                {listing.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                      {listing.images.map((_, index) => (
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
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          
          {/* Listing details */}
          <div className="mt-8">
            <div className="flex flex-wrap items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                
                <div className="mt-2 flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{listing.location || 'Location not specified'}</span>
                </div>
                
                <div className="mt-1 flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>Posted {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}</span>
                </div>
              </div>
              
              <div className="mt-2 sm:mt-0">
                {listing.price === 0 ? (
                  <div className="text-2xl font-bold text-secondary-600">Free</div>
                ) : (
                  <div className="text-2xl font-bold text-primary-600">${listing.price.toFixed(2)}</div>
                )}
                
                {listing.original_price && listing.original_price > listing.price && (
                  <div className="text-sm text-gray-500 line-through">
                    Original: ${listing.original_price.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            
            {/* Expiry warning */}
            {(isExpired || isExpiringSoon) && (
              <div className={`mt-4 p-3 rounded-md flex items-start ${
                isExpired ? 'bg-red-50' : 'bg-yellow-50'
              }`}>
                <AlertTriangle className={`h-5 w-5 mr-2 ${
                  isExpired ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <div>
                  <p className={`font-medium ${
                    isExpired ? 'text-red-800' : 'text-yellow-800'
                  }`}>
                    {isExpired ? 'This listing has expired' : 'Expiring soon'}
                  </p>
                  <p className={`text-sm ${
                    isExpired ? 'text-red-700' : 'text-yellow-700'
                  }`}>
                    {isExpired 
                      ? `Expired ${formatDistanceToNow(new Date(listing.expiry_date), { addSuffix: true })}`
                      : `Expires ${formatDistanceToNow(new Date(listing.expiry_date), { addSuffix: true })}`
                    }
                  </p>
                </div>
              </div>
            )}
            
            {/* Tags */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {listing.category}
                </span>
                
                {listing.dietary_info && listing.dietary_info.map((diet, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {diet}
                  </span>
                ))}
                
                {listing.quantity && (
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                    Qty: {listing.quantity}
                  </span>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <div className="mt-2 prose prose-primary max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{listing.description || 'No description provided.'}</p>
              </div>
            </div>
            
            {/* Additional details */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Additional Details</h2>
              <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                {listing.expiry_date && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {format(new Date(listing.expiry_date), 'PPP')}
                    </dd>
                  </div>
                )}
                
                {listing.pickup_times && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Pickup Times</dt>
                    <dd className="mt-1 text-sm text-gray-900">{listing.pickup_times}</dd>
                  </div>
                )}
                
                {listing.storage_instructions && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Storage Instructions</dt>
                    <dd className="mt-1 text-sm text-gray-900">{listing.storage_instructions}</dd>
                  </div>
                )}
                
                {listing.allergens && listing.allergens.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Allergens</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {listing.allergens.join(', ')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
        
        {/* Right column - Seller info and actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            {/* Seller card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {listing.profiles?.avatar_url ? (
                    <img 
                      className="h-12 w-12 rounded-full object-cover"
                      src={listing.profiles.avatar_url}
                      alt={listing.profiles.name}
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {listing.profiles?.name || 'Anonymous'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Member since {format(new Date(listing.profiles?.created_at || listing.created_at), 'MMM yyyy')}
                  </p>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                {user?.id !== listing.user_id && (
                  <button
                    onClick={startConversation}
                    className="btn btn-primary w-full flex items-center justify-center"
                    disabled={isExpired}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contact Seller
                  </button>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={toggleSave}
                    className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'} w-full flex items-center justify-center`}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="btn btn-outline w-full flex items-center justify-center"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>
              
              {/* Pickup info */}
              {listing.pickup_instructions && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900">Pickup Instructions</h4>
                  <p className="mt-1 text-sm text-gray-700">{listing.pickup_instructions}</p>
                </div>
              )}
            </div>
            
            {/* Related listings */}
            {relatedListings.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Similar Listings</h3>
                <div className="space-y-4">
                  {relatedListings.map(related => (
                    <Link 
                      key={related.id} 
                      to={`/listings/${related.id}`}
                      className="block bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 w-24 h-24">
                          {related.images && related.images.length > 0 ? (
                            <img 
                              src={related.images[0]} 
                              alt={related.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{related.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 truncate">{related.location}</p>
                          <p className="text-sm font-medium text-primary-600 mt-2">
                            {related.price === 0 ? 'Free' : `$${related.price.toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail
