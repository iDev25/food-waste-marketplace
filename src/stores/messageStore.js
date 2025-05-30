import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useMessageStore = create((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  loading: false,
  error: null,
  
  // Fetch user's conversations
  fetchConversations: async (userId) => {
    set({ loading: true, error: null })
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participants:conversation_participants (
            user_id,
            profiles:user_id (
              id,
              name,
              avatar_url
            )
          )
        `)
        .contains('participants.user_id', [userId])
        .order('updated_at', { ascending: false })
      
      if (error) throw error
      
      // Process conversations to get the other participant
      const processedConversations = data.map(conversation => {
        const otherParticipant = conversation.participants.find(
          p => p.user_id !== userId
        )?.profiles
        
        return {
          ...conversation,
          otherParticipant
        }
      })
      
      set({ conversations: processedConversations, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  // Fetch or create a conversation with another user
  fetchOrCreateConversation: async (userId, otherUserId) => {
    set({ loading: true, error: null })
    
    try {
      // Check if conversation exists
      const { data: existingConversations, error: fetchError } = await supabase
        .from('conversations')
        .select(`
          *,
          participants:conversation_participants (
            user_id,
            profiles:user_id (
              id,
              name,
              avatar_url
            )
          )
        `)
        .contains('participants.user_id', [userId])
        .contains('participants.user_id', [otherUserId])
      
      if (fetchError) throw fetchError
      
      // If conversation exists, use it
      if (existingConversations && existingConversations.length > 0) {
        const conversation = existingConversations[0]
        set({ currentConversation: conversation, loading: false })
        await get().fetchMessages(conversation.id)
        return conversation
      }
      
      // Otherwise, create a new conversation
      const { data: newConversation, error: createError } = await supabase
        .from('conversations')
        .insert([{ created_by: userId }])
        .select()
      
      if (createError) throw createError
      
      // Add participants
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert([
          { conversation_id: newConversation[0].id, user_id: userId },
          { conversation_id: newConversation[0].id, user_id: otherUserId }
        ])
      
      if (participantsError) throw participantsError
      
      // Fetch the complete conversation with participants
      const { data: completeConversation, error: completeError } = await supabase
        .from('conversations')
        .select(`
          *,
          participants:conversation_participants (
            user_id,
            profiles:user_id (
              id,
              name,
              avatar_url
            )
          )
        `)
        .eq('id', newConversation[0].id)
        .single()
      
      if (completeError) throw completeError
      
      // Process to get other participant
      const otherParticipant = completeConversation.participants.find(
        p => p.user_id !== userId
      )?.profiles
      
      const processedConversation = {
        ...completeConversation,
        otherParticipant
      }
      
      set({ 
        currentConversation: processedConversation,
        conversations: [processedConversation, ...get().conversations],
        loading: false 
      })
      
      return processedConversation
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },
  
  // Fetch messages for a conversation
  fetchMessages: async (conversationId) => {
    set({ loading: true, error: null })
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (
            id,
            name,
            avatar_url
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
      
      if (error) throw error
      
      set({ messages: data, loading: false })
      
      // Set up real-time subscription for new messages
      const subscription = supabase
        .channel(`messages:${conversationId}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        }, (payload) => {
          // Fetch the complete message with sender info
          get().fetchNewMessage(payload.new.id)
        })
        .subscribe()
      
      // Store subscription for cleanup
      get().messageSubscription = subscription
      
      return data
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  // Fetch a single new message (used for real-time updates)
  fetchNewMessage: async (messageId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (
            id,
            name,
            avatar_url
          )
        `)
        .eq('id', messageId)
        .single()
      
      if (error) throw error
      
      set({ messages: [...get().messages, data] })
    } catch (error) {
      console.error('Error fetching new message:', error)
    }
  },
  
  // Send a message
  sendMessage: async (conversationId, senderId, content) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          conversation_id: conversationId,
          sender_id: senderId,
          content
        }])
        .select()
      
      if (error) throw error
      
      // Update conversation's updated_at timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId)
      
      return data[0]
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  },
  
  // Clean up subscriptions
  cleanup: () => {
    if (get().messageSubscription) {
      get().messageSubscription.unsubscribe()
    }
  },
  
  // Set current conversation
  setCurrentConversation: (conversation) => {
    set({ currentConversation: conversation })
  },
  
  // Clear current conversation
  clearCurrentConversation: () => {
    set({ currentConversation: null, messages: [] })
    get().cleanup()
  }
}))

export default useMessageStore
