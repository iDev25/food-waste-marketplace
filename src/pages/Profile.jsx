import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { AlertCircle, Camera } from 'lucide-react'

const Profile = () => {
  const { user, profile, updateProfile, signOut } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: profile?.name || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      avatar_url: profile?.avatar_url || ''
    }
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      
      await updateProfile(data)
      
      setSuccess(true)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-gray-600">
          Update your personal information and how others see you on the platform.
        </p>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-green-50 p-4 rounded-md">
          <p className="text-sm text-green-700">
            Your profile has been updated successfully.
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || 'User'}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-3xl font-medium text-primary-600">
                        {profile?.name?.charAt(0) || user?.email?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <label htmlFor="avatar_url" className="label">
                    Profile Picture URL
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      id="avatar_url"
                      className="input"
                      placeholder="https://example.com/avatar.jpg"
                      {...register('avatar_url')}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter a URL for your profile picture.
                  </p>
                </div>
              </div>
              
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`input ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="input bg-gray-50"
                      value={user?.email || ''}
                      disabled
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="account_type" className="label">
                      Account Type
                    </label>
                    <input
                      id="account_type"
                      type="text"
                      className="input bg-gray-50"
                      value={profile?.account_type || 'Individual'}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="label">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      className="input"
                      placeholder="e.g., New York, NY"
                      {...register('location')}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="bio" className="label">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows="4"
                      className="input"
                      placeholder="Tell others about yourself or your business..."
                      {...register('bio')}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
