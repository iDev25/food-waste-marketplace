import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import useMessageStore from '../stores/messageStore'
import { formatDistanceToNow } from 'date-fns'
import { MessageSquare, AlertTriangle } from 'lucide-react'

const Messages = () => {
  const { user } = useAuth()
  const { conversations, loading, error, fetchConversations } = useMessageStore()
  
  useEffect(() => {
    if (user) {
      fetchConversations(user.id)
    }
  }, [user, fetchConversations])
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-2 text-gray-600">
          Communicate with suppliers and buyers about food listings.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="p-6">
            <div className="bg-red-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-6 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any conversations yet. Start by contacting a food supplier.
            </p>
            <div className="mt-6">
              <Link
                to="/listings"
                className="btn btn-primary inline-flex items-center"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {conversations.map(conversation => (
              <li key={conversation.id}>
                <Link
                  to={`/messages/${conversation.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {conversation.otherParticipant?.avatar_url ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={conversation.otherParticipant.avatar_url}
                            alt={conversation.otherParticipant.name}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-lg font-medium text-primary-600">
                              {conversation.otherParticipant?.name?.charAt(0) || '?'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary-600 truncate">
                            {conversation.otherParticipant?.name || 'Unknown User'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conversation.updated_at && formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600 truncate">
                            {/* This would show the last message in a real app */}
                            Click to view conversation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Messages
