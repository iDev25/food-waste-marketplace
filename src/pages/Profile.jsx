import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { User, Mail, MapPin, Phone, Camera, Save, AlertTriangle } from 'lucide-react'

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    phone: '',
    website: '',
    organization: '',
    organization_type: ''
  })
  
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || '',
        website: profile.website || '',
        organization: profile.organization || '',
        organization_type: profile.organization_type || ''
      })
      
      setAvatarUrl(profile.avatar_url)
    }
  }, [profile])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      setUploading(true)
      
      // Validate file type
      if (!file.type.match('image.*')) {
        setMessage({ type: 'error', text: 'Please upload an image file' })
        return
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 2MB' })
        return
      }
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}.${fileExt}`
      const filePath = `avatars/${fileName}`
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, { upsert: true })
      
      if (uploadError) throw uploadError
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath)
      
      setAvatarUrl(publicUrl)
      
      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)
      
      if (updateError) throw updateError
      
      setMessage({ type: 'success', text: 'Avatar updated successfully' })
      refreshProfile()
    } catch (error) {
      console.error('Error uploading avatar:', error)
      setMessage({ type: 'error', text: 'Error uploading avatar' })
    } finally {
      setUploading(false)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id)
      
      if (error) throw error
      
      setMessage({ type: 'success', text: 'Profile updated successfully' })
      refreshProfile()
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Error updating profile' })
    } finally {
      setSaving(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your personal information and preferences.
        </p>
      </div>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {message.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Avatar section */}
        <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt={formData.name || 'User'} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300 cursor-pointer">
                <Camera className="h-4 w-4 text-gray-500" />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h3 className="text-lg font-medium text-gray-900">
                {profile?.name || 'Your Name'}
              </h3>
              <p className="text-sm text-gray-500">
                {user?.email}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Profile form */}
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal details and contact information.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ''}
                    className="input pl-10 bg-gray-50"
                    disabled
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Email cannot be changed
                </p>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="City, State"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="input"
                    placeholder="Tell us a bit about yourself"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Brief description for your profile. This will be visible to other users.
                </p>
              </div>
            </div>
            
            <div className="pt-5">
              <h3 className="text-lg font-medium text-gray-900">Organization Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                If you represent an organization, provide details below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="mt-1 input"
                  placeholder="Organization name (if applicable)"
                />
              </div>
              
              <div>
                <label htmlFor="organization_type" className="block text-sm font-medium text-gray-700">
                  Organization Type
                </label>
                <select
                  id="organization_type"
                  name="organization_type"
                  value={formData.organization_type}
                  onChange={handleChange}
                  className="mt-1 input"
                >
                  <option value="">Select type (if applicable)</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Grocery Store">Grocery Store</option>
                  <option value="Food Bank">Food Bank</option>
                  <option value="Community Organization">Community Organization</option>
                  <option value="School/University">School/University</option>
                  <option value="Farm">Farm</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="mt-1 input"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
