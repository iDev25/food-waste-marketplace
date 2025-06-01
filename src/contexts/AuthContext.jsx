import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }
        
        setUser(session?.user || null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }
    
    getSession()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        throw error
      }
      
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
  
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }
  
  const signUp = async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      
      if (error) {
        throw error
      }
      
      // Create profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            email
          })
        
        if (profileError) {
          throw profileError
        }
      }
      
      return data
    } catch (error) {
      throw error
    }
  }
  
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        throw error
      }
      
      return data
    } catch (error) {
      throw error
    }
  }
  
  const signInWithSocialProvider = async (provider) => {
    try {
      // Only use providers that are actually supported by Supabase
      if (provider !== 'google') {
        throw new Error(`${provider} authentication is not currently available. Please use email/password or Google sign-in.`)
      }
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) {
        throw error
      }
      
      return data
    } catch (error) {
      throw error
    }
  }
  
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
      
      setUser(null)
      setProfile(null)
    } catch (error) {
      throw error
    }
  }
  
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) {
        throw error
      }
      
      return true
    } catch (error) {
      throw error
    }
  }
  
  const updatePassword = async (password) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      })
      
      if (error) {
        throw error
      }
      
      return true
    } catch (error) {
      throw error
    }
  }
  
  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithSocialProvider,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
