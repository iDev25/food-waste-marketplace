import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { format } from 'date-fns'
import { ArrowLeft, Send, User, MapPin, Clock } from 'lucide-react'

const Conversation = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  
  useEffect(() => {
    const fetchConversation = async () => {
      if (!user || !id) return
      
      try {
        setLoading(true)
        
        // Fetch conversation details
        const { data: convoData, error: convoError } = await supabase
          .from('conversations')
          .select(`
            *,
            listings(*),
            buyer:user_id(id, name, avatar_url),
            seller:seller_id(id, name, avatar_url)
          `)
          .eq('id', id)
          .single()
        
        if (convoError) throw convoError
        
        // Make sure user is part of this conversation
        if (convoData.user_id !== user.id && convoData.seller_id !== user.id) {
          throw new Error('You do not have permission to view this conversation')
        }
        
        setConversation(convoData)
        
        // Fetch messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', id)
          .order('created_at', { ascending: true })
        
        if (messagesError) throw messagesError
        
        setMessages(messagesData || [])
        
        // Mark unread messages as read
        const unreadMessages = messagesData.filter(msg => 
          msg.sender_id !== user.id && !msg.is_read
        )
        
        if (unreadMessages.length > 0) {
          await supabase
            .from('messages')
            .update({ is_read: true })
            .in('id', unreadMessages.map(msg => msg.id))
        }
      } catch (error) {
        console.error('Error fetching conversation:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchConversation()
    
    // Set up real-time subscription for new messages
    const subscription = supabase
      .channel(`conversation-${id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${id}`
      }, payload => {
        const newMsg = payload.new
        
        // Add the new message to the state
        setMessages(current => [...current, newMsg])
        
        // If the message is from the other person, mark it as read
        if (newMsg.sender_id !== user.id) {
          supabase
            .from('messages')
            .update({ is_read: true })
            .eq('id', newMsg.id)
        }
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [id, user])
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const sendMessage = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !user || !conversation) return
    
    try {
      setSending(true)
      
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: id,
          sender_id: user.id,
          content: newMessage.trim(),
          is_read: false
        })
      
      if (error) throw error
      
      // Update conversation's updated_at timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', id)
      
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSending(false)
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
          <Link to="/messages" className="mt-4 inline-flex items-center text-red-600 hover:text-red-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to messages
          </Link>
        </div>
      </div>
    )
  }
  
  if (!conversation) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 p-4 rounded-md">
          <h2 className="text-lg font-medium text-yellow-800">Conversation not found</h2>
          <p className="mt-2 text-yellow-700">The conversation you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link to="/messages" className="mt-4 inline-flex items-center text-yellow-600 hover:text-yellow-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to messages
          </Link>
        </div>
      </div>
    )
  }
  
  const isSeller = conversation.seller_id === user.id
  const otherPerson = isSeller ? conversation.buyer : conversation.seller
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/messages" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to messages
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Conversation header */}
        <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
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
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {otherPerson?.name || 'Unknown User'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isSeller ? 'Buyer' : 'Seller'}
                </p>
              </div>
            </div>
            
            <Link 
              to={`/listings/${conversation.listing_id}`}
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              View Listing
            </Link>
          </div>
        </div>
        
        {/* Listing info */}
        <div className="px-4 py-3 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {conversation.listings?.images && conversation.listings.images[0] ? (
                <img 
                  src={conversation.listings.images[0]} 
                  alt={conversation.listings.title}
                  className="h-12 w-12 rounded-md object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">No image</span>
                </div>
              )}
            </div>
            <div className="ml-3 flex-1">
              <h4 className="text-sm font-medium text-gray-900">
                {conversation.listings?.title || 'Unknown Listing'}
              </h4>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{conversation.listings?.location || 'Unknown location'}</span>
                
                {conversation.listings?.price !== undefined && (
                  <span className="ml-3 font-medium text-primary-600">
                    {conversation.listings.price === 0 ? 'Free' : `$${conversation.listings.price.toFixed(2)}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="px-4 py-4 sm:px-6 h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-gray-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => {
                const isCurrentUser = message.sender_id === user.id
                const showDate = index === 0 || 
                  new Date(message.created_at).toDateString() !== 
                  new Date(messages[index - 1].created_at).toDateString()
                
                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="flex justify-center my-4">
                        <div className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                          {format(new Date(message.created_at), 'MMMM d, yyyy')}
                        </div>
                      </div>
                    )}
                    
                    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                        isCurrentUser 
                          ? 'bg-primary-100 text-primary-900' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          isCurrentUser ? 'text-primary-500' : 'text-gray-500'
                        }`}>
                          {format(new Date(message.created_at), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Message input */}
        <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
          <form onSubmit={sendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input flex-1"
              disabled={sending}
            />
            <button
              type="submit"
              className="ml-3 btn btn-primary"
              disabled={!newMessage.trim() || sending}
            >
              {sending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Conversation
