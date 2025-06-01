import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, User, AlertTriangle, Facebook, Loader2, ArrowRight, Check, Instagram } from 'lucide-react'

const Register = () => {
  const { signUp, signInWithSocialProvider } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState('')
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required')
      return false
    }
    
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    
    return true
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      setError('')
      setLoading(true)
      
      await signUp(formData.email, formData.password, formData.name)
      
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Failed to create an account')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSocialSignIn = async (provider) => {
    try {
      setError('')
      setSocialLoading(provider)
      
      await signInWithSocialProvider(provider)
      // No need to navigate as OAuth will redirect automatically
    } catch (error) {
      console.error(`${provider} registration error:`, error)
      setError(error.message || `Failed to register with ${provider}`)
      setSocialLoading('')
    }
  }
  
  // Password strength indicators
  const hasMinLength = formData.password.length >= 6
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg className="h-14 w-14 text-primary-600 drop-shadow-md transition-transform hover:scale-110 duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12a9 9 0 0 0-9-9v9h9z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12 12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
          Join GrubLinX today
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200 underline decoration-2 decoration-primary-300 underline-offset-2 hover:decoration-primary-500">
            Sign in instead
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100 transition-all duration-300 hover:shadow-xl animate-fadeIn">
          {error && (
            <div className="mb-6 bg-red-50 p-4 rounded-lg border-l-4 border-red-400 animate-slideIn">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    There was an error with your registration
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => handleSocialSignIn('google')}
                disabled={!!socialLoading}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:border-gray-400"
                aria-label="Sign up with Google"
              >
                {socialLoading === 'google' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn('twitter')}
                disabled={!!socialLoading}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:border-gray-400"
                aria-label="Sign up with X (Twitter)"
              >
                {socialLoading === 'twitter' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn('facebook')}
                disabled={!!socialLoading}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:border-gray-400"
                aria-label="Sign up with Facebook"
              >
                {socialLoading === 'facebook' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Facebook className="h-5 w-5 text-[#4267B2]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn('instagram')}
                disabled={!!socialLoading}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:border-gray-400"
                aria-label="Sign up with Instagram"
              >
                {socialLoading === 'instagram' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Instagram className="h-5 w-5 text-[#E1306C]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn('nextdoor')}
                disabled={!!socialLoading}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:border-gray-400"
                aria-label="Sign up with NextDoor"
              >
                {socialLoading === 'nextdoor' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg className="h-5 w-5 text-[#00B551]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1.25C6.072 1.25 1.25 6.072 1.25 12S6.072 22.75 12 22.75 22.75 17.928 22.75 12 17.928 1.25 12 1.25zm0 1.5c5.1 0 9.25 4.15 9.25 9.25s-4.15 9.25-9.25 9.25S2.75 17.1 2.75 12 6.9 2.75 12 2.75z" />
                    <path d="M15.75 8.068a.75.75 0 0 1 .232 1.035l-3.465 5.197a.75.75 0 0 1-1.267 0L7.785 9.103a.75.75 0 0 1 1.267-.802L12 12.445l2.948-4.144a.75.75 0 0 1 .802-.233z" />
                  </svg>
                )}
              </button>
            </div>
            
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with email
                </span>
              </div>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input pl-10 transition-all duration-200 border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10 transition-all duration-200 border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10 transition-all duration-200 border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-2 flex items-center">
                <div className={`flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200`}>
                  {hasMinLength && <Check className="h-3 w-3 text-white" />}
                </div>
                <p className={`ml-2 text-xs ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                  At least 6 characters
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pl-10 transition-all duration-200 border-gray-300 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-2 flex items-center">
                <div className={`flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center ${formData.password && formData.password === formData.confirmPassword ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200`}>
                  {formData.password && formData.password === formData.confirmPassword && <Check className="h-3 w-3 text-white" />}
                </div>
                <p className={`ml-2 text-xs ${formData.password && formData.password === formData.confirmPassword ? 'text-green-600' : 'text-gray-500'}`}>
                  Passwords match
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn btn-primary group relative overflow-hidden transition-all duration-300 transform hover:translate-y-[-2px]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Creating account...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    Create account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
              Terms of Service
            </Link>
            {' and '}
            <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
