import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { formatDistanceToNow } from 'date-fns'
import { User, MessageSquare } from 'lucide-react'

const Messages = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        
        // Fetch conversations where user is either the buyer or seller
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            listings(id, title, images),
            buyer:user_id(id, name, avatar_url),
            seller:seller_id(id, name, avatar_url),
            messages(id, created_at, content, is_read, sender_id)
          `)
          .or(`user_id.eq.${user.id},seller_id.eq.${user.id}`)
          .order('updated_at', { ascending: false })
        
        if (error) throw error
        
        // Process conversations to add additional info
        const processedConversations = data.map(convo => {
          const isSeller = convo.seller_id === user.id
          const otherPerson = isSeller ? convo.buyer : convo.seller
          
          // Sort messages by created_at
          const sortedMessages = convo.messages.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          )
          
          // Check for unread messages (where the user is the recipient)
          const unreadCount = sortedMessages.filter(msg => 
            msg.sender_id !== user.id && !msg.is_read
          ).length
          
          return {
            ...convo,
            otherPerson,
            isSeller,
            latestMessage: sortedMessages[0] || null,
            unreadCount
          }
        })
        
        setConversations(processedConversations)
      } catch (error) {
        console.error('Error fetching conversations:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchConversations()
    
    // Set up real-time subscription for new messages
    const subscription = supabase
      .channel('messages-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, () => {
        fetchConversations()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [user])
  
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
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-2 text-lg text-gray-600">
          Communicate with buyers and sellers about listings.
        </p>
      </div>
      
      {conversations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
            <MessageSquare className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No messages yet</h3>
          <p className="mt-1 text-gray-500">
            When you contact sellers or receive messages about your listings, they'll appear here.
          </p>
          <div className="mt-6">
            <Link to="/listings" className="btn btn-primary">
              Browse Listings
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {conversations.map(conversation => (
              <li key={conversation.id}>
                <Link 
                  to={`/messages/${conversation.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {conversation.otherPerson?.avatar_url ? (
                            <img 
                              className="h-12 w-12 rounded-full object-cover"
                              src={conversation.otherPerson.avatar_url}
                              alt={conversation.otherPerson.name}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {conversation.otherPerson?.name || 'Unknown User'}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {conversation.updated_at && 
                                formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                            </p>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.listings?.title || 'Unknown Listing'}
                            </p>
                          </div>
                          <div className="mt-1">
                            <p className={`text-sm truncate ${
                              conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                            }`}>
                              {conversation.latestMessage ? (
                                conversation.latestMessage.sender_id === user.id ? (
                                  <span>You: {conversation.latestMessage.content}</span>
                                ) : (
                                  conversation.latestMessage.content
                                )
                              ) : (
                                'No messages yet'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-shrink-0">
                        <div className="flex items-center">
                          {conversation.listings?.images && conversation.listings.images[0] && (
                            <img 
                              src={conversation.listings.images[0]} 
                              alt={conversation.listings.title}
                              className="h-10 w-10 rounded-md object-cover mr-2"
                            />
                          )}
                          
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Messages
