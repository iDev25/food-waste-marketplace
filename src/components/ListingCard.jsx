import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { MapPin, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const ListingCard = ({ listing }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  
  const isExpiringSoon = () => {
    if (!listing.expiry_date) return false
    const expiryDate = new Date(listing.expiry_date)
    const now = new Date()
    const diffHours = (expiryDate - now) / (1000 * 60 * 60)
    return diffHours < 24 && diffHours > 0
  }
  
  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card hover:shadow-lg"
    >
      <Link to={`/listings/${listing.id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          {listing.images && listing.images.length > 0 ? (
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center transition-colors duration-200 hover:bg-opacity-100"
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
          
          {listing.price === 0 ? (
            <div className="absolute top-2 left-2 bg-secondary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Free
            </div>
          ) : (
            <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              ${listing.price?.toFixed(2) || '0.00'}
            </div>
          )}
          
          {isExpiringSoon() && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Expiring soon
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">{listing.title}</h3>
          
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{listing.location || 'Location not specified'}</span>
          </div>
          
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {listing.category || 'Uncategorized'}
              </span>
              
              {listing.dietary_info && listing.dietary_info.map((diet, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {diet}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-3 flex items-center">
            <div className="flex-shrink-0">
              {listing.profiles?.avatar_url ? (
                <img 
                  className="h-8 w-8 rounded-full object-cover"
                  src={listing.profiles.avatar_url}
                  alt={listing.profiles.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-700">
                    {listing.profiles?.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">{listing.profiles?.name || 'Anonymous'}</p>
              <p className="text-xs text-gray-500">
                {listing.created_at && formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ListingCard
