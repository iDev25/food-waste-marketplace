import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import useMessageStore from '../stores/messageStore'
import { formatDistanceToNow } from 'date-fns'
import { ChevronLeft, Send, AlertTriangle } from 'lucide-react'

const Conversation = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const { 
    currentConversation, 
    messages, 
    loading, 
    error, 
    fetchOrCreateConversation, 
    fetchMessages,
    sendMessage,
    clearCurrentConversation
  } = useMessageStore()
  
  const [newMessage, setNewMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)
  
  const messagesEndRef = useRef(null)
  
  useEffect(() => {
    if (user && id) {
      const loadConversation = async () => {
        try {
          // First check if we need to fetch the conversation
          if (!currentConversation || currentConversation.id !== id) {
            await fetchOrCreateConversation(user.id, null, id)
          }
          
          // Then fetch messages
          await fetchMessages(id)
        } catch (error) {
          console.error('Error loading conversation:', error)
        }
      }
      
      loadConversation()
    }
    
    return () => {
      clearCurrentConversation()
    }
  }, [user, id, fetchOrCreateConversation, fetchMessages, clearCurrentConversation, currentConversation])
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !user || !currentConversation) return
    
    try {
      setSendingMessage(true)
      await sendMessage(currentConversation.id, user.id, newMessage)
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSendingMessage(false)
    }
  }
  
  if (loading && !currentConversation) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading conversation</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
              <div className="mt-4">
                <Link to="/messages" className="text-sm font-medium text-red-800 hover:text-red-700">
                  Go back to messages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!currentConversation) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Conversation not found</h3>
          <p className="text-gray-600 mb-4">
            The conversation you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/messages" className="btn btn-primary">
            Back to Messages
          </Link>
        </div>
      </div>
    )
  }
  
  const otherParticipant = currentConversation.otherParticipant
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/messages" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to messages
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
        {/* Conversation header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center">
          <div className="flex-shrink-0">
            {otherParticipant?.avatar_url ? (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={otherParticipant.avatar_url}
                alt={otherParticipant.name}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-lg font-medium text-primary-600">
                  {otherParticipant?.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {otherParticipant?.name || 'Unknown User'}
            </p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center">
                No messages yet. Start the conversation by sending a message.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(message => {
                const isCurrentUser = message.sender_id === user?.id
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isCurrentUser && (
                      <div className="flex-shrink-0 mr-2">
                        {message.sender?.avatar_url ? (
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={message.sender.avatar_url}
                            alt={message.sender.name}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-500">
                              {message.sender?.name?.charAt(0) || '?'}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-100' : 'text-gray-500'}`}>
                        {message.created_at && formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              className="input flex-1 mr-2"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={sendingMessage}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!newMessage.trim() || sendingMessage}
            >
              {sendingMessage ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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
