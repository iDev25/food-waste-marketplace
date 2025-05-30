import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

const ListingCard = ({ listing }) => {
  const {
    id,
    title,
    price,
    images,
    location,
    created_at,
    expiry_date,
    profiles
  } = listing

  // Get the first image or use a placeholder
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

  // Format the created date
  const createdDate = new Date(created_at)
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true })

  // Check if item is expiring soon (within 24 hours)
  const isExpiringSoon = expiry_date && (() => {
    const expiryDate = new Date(expiry_date)
    const now = new Date()
    const diffHours = (expiryDate - now) / (1000 * 60 * 60)
    return diffHours < 24 && diffHours > 0
  })()

  return (
    <Link to={`/listings/${id}`} className="card group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isExpiringSoon && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Expiring Soon
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-bold text-lg">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
          <p>{location}</p>
          <p>{timeAgo}</p>
        </div>
        {profiles && (
          <div className="mt-3 flex items-center">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
              {profiles.avatar_url ? (
                <img 
                  src={profiles.avatar_url} 
                  alt={profiles.name || 'User'} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-800 text-xs font-bold">
                  {profiles.name ? profiles.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <p className="ml-2 text-xs text-gray-500">
              {profiles.name || 'Anonymous'}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default ListingCard
