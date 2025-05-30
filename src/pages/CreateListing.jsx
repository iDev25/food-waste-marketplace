import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import useListingStore from '../stores/listingStore'
import { Plus, X, AlertCircle } from 'lucide-react'

const CATEGORIES = [
  'Produce',
  'Bakery',
  'Dairy',
  'Meat',
  'Prepared Meals',
  'Pantry Items',
  'Beverages',
  'Other'
]

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Organic'
]

const PICKUP_OPTIONS = [
  'Pickup only',
  'Delivery available',
  'Pickup or delivery'
]

const CreateListing = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      category: '',
      price: 0,
      quantity: 1,
      quantity_unit: 'items',
      description: '',
      location: '',
      pickup_delivery: 'Pickup only',
      dietary_info: [],
      is_free: false
    }
  })
  const { user } = useAuth()
  const { createListing } = useListingStore()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  
  const isFree = watch('is_free')
  
  // Handle dietary preferences
  const handleDietaryChange = (diet) => {
    const currentDietary = watch('dietary_info') || []
    const newDietary = currentDietary.includes(diet)
      ? currentDietary.filter(d => d !== diet)
      : [...currentDietary, diet]
    
    setValue('dietary_info', newDietary)
  }
  
  // Handle image URL input
  const handleAddImageUrl = () => {
    if (imageUrls.length >= 5) {
      alert('You can only add up to 5 images')
      return
    }
    
    setImageUrls([...imageUrls, ''])
  }
  
  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls]
    newUrls[index] = value
    setImageUrls(newUrls)
  }
  
  const handleRemoveImageUrl = (index) => {
    const newUrls = [...imageUrls]
    newUrls.splice(index, 1)
    setImageUrls(newUrls)
  }
  
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setError(null)
      
      // Filter out empty image URLs
      const validImageUrls = imageUrls.filter(url => url.trim() !== '')
      
      // Prepare listing data
      const listingData = {
        ...data,
        supplier_id: user.id,
        price: data.is_free ? 0 : parseFloat(data.price),
        quantity: parseInt(data.quantity),
        images: validImageUrls.length > 0 ? validImageUrls : null,
        status: 'available',
        created_at: new Date().toISOString()
      }
      
      // Create listing
      const newListing = await createListing(listingData)
      
      // Navigate to the new listing
      navigate(`/listings/${newListing.id}`)
    } catch (error) {
      console.error('Error creating listing:', error)
      setError('Failed to create listing. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
        <p className="mt-2 text-gray-600">
          List your surplus food items to reduce waste and help others.
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
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="title" className="label">
                    Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    className={`input ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="e.g., Fresh Organic Apples"
                    {...register('title', { required: 'Title is required' })}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="label">
                    Category *
                  </label>
                  <select
                    id="category"
                    className={`input ${errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    {...register('category', { required: 'Category is required' })}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      id="is_free"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      {...register('is_free')}
                    />
                    <label htmlFor="is_free" className="ml-2 block text-sm text-gray-700">
                      Offer for free
                    </label>
                  </div>
                  
                  <label htmlFor="price" className="label">
                    Price {isFree ? '(Free)' : '*'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      className={`input pl-7 ${errors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="0.00"
                      disabled={isFree}
                      {...register('price', { 
                        required: !isFree && 'Price is required',
                        min: {
                          value: 0,
                          message: 'Price must be a positive number'
                        }
                      })}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="quantity" className="label">
                    Quantity *
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    className={`input ${errors.quantity ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    {...register('quantity', { 
                      required: 'Quantity is required',
                      min: {
                        value: 1,
                        message: 'Quantity must be at least 1'
                      }
                    })}
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="quantity_unit" className="label">
                    Unit
                  </label>
                  <input
                    id="quantity_unit"
                    type="text"
                    className="input"
                    placeholder="e.g., kg, items, portions"
                    {...register('quantity_unit')}
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="input"
                    placeholder="Describe your food item, including condition, origin, etc."
                    {...register('description')}
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Dietary Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dietary Information</h3>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Select all that apply:
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {DIETARY_OPTIONS.map(diet => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => handleDietaryChange(diet)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        watch('dietary_info')?.includes(diet)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Location & Pickup */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Pickup</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="label">
                    Location *
                  </label>
                  <input
                    id="location"
                    type="text"
                    className={`input ${errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="e.g., Downtown, 123 Main St"
                    {...register('location', { required: 'Location is required' })}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="pickup_delivery" className="label">
                    Pickup/Delivery Options *
                  </label>
                  <select
                    id="pickup_delivery"
                    className={`input ${errors.pickup_delivery ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    {...register('pickup_delivery', { required: 'Pickup/delivery option is required' })}
                  >
                    {PICKUP_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.pickup_delivery && (
                    <p className="mt-1 text-sm text-red-600">{errors.pickup_delivery.message}</p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="expiry_date" className="label">
                    Best Before / Expiry Date
                  </label>
                  <input
                    id="expiry_date"
                    type="date"
                    className="input"
                    {...register('expiry_date')}
                  />
                </div>
              </div>
            </div>
            
            {/* Images */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Add up to 5 image URLs to showcase your food item.
                </p>
                
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder="https://example.com/image.jpg"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImageUrl(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                
                {imageUrls.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="btn btn-outline flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Image URL
                  </button>
                )}
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
              'Create Listing'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateListing
