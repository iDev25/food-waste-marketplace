import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import useListingStore from '../stores/listingStore'
import { supabase } from '../lib/supabase'
import { Plus, X, Upload, AlertTriangle } from 'lucide-react'

const CATEGORIES = [
  'Produce',
  'Bakery',
  'Dairy',
  'Meat',
  'Prepared Food',
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
  'Organic',
  'Halal',
  'Kosher'
]

const ALLERGENS = [
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish',
  'Tree Nuts',
  'Peanuts',
  'Wheat',
  'Soybeans',
  'Sesame'
]

const CreateListing = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { addListing } = useListingStore()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    original_price: '',
    quantity: '',
    location: '',
    expiry_date: '',
    pickup_times: '',
    pickup_instructions: '',
    storage_instructions: '',
    dietary_info: [],
    allergens: []
  })
  
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }
  
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter(item => item !== value)
      }))
    }
  }
  
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    // Limit to 5 images total
    if (images.length + files.length > 5) {
      alert('You can upload a maximum of 5 images')
      return
    }
    
    setUploading(true)
    
    try {
      const uploadedUrls = []
      
      for (const file of files) {
        // Validate file type
        if (!file.type.match('image.*')) {
          alert('Please upload image files only')
          continue
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should be less than 5MB')
          continue
        }
        
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `${user.id}/${fileName}`
        
        const { error: uploadError, data } = await supabase.storage
          .from('listing-images')
          .upload(filePath, file)
        
        if (uploadError) {
          console.error('Error uploading image:', uploadError)
          continue
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('listing-images')
          .getPublicUrl(filePath)
        
        uploadedUrls.push(publicUrl)
      }
      
      setImages(prev => [...prev, ...uploadedUrls])
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Error uploading images. Please try again.')
    } finally {
      setUploading(false)
    }
  }
  
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (formData.price === '') {
      newErrors.price = 'Price is required'
    } else if (isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Price must be a non-negative number'
    }
    
    if (formData.original_price && (isNaN(formData.original_price) || Number(formData.original_price) < 0)) {
      newErrors.original_price = 'Original price must be a non-negative number'
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setSubmitting(true)
    
    try {
      // Format the data
      const listingData = {
        ...formData,
        user_id: user.id,
        price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : null,
        quantity: formData.quantity || null,
        images: images.length > 0 ? images : null
      }
      
      const data = await addListing(listingData)
      
      navigate(`/listings/${data[0].id}`)
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Error creating listing. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
        <p className="mt-2 text-lg text-gray-600">
          List your surplus food to reduce waste and help others.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 input ${errors.title ? 'border-red-500' : ''}`}
                placeholder="e.g., Fresh Organic Apples"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 input"
                placeholder="Describe your food item, including condition, quantity, etc."
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 input ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`mt-1 input ${errors.price ? 'border-red-500' : ''}`}
                  placeholder="0.00 for free items"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="original_price" className="block text-sm font-medium text-gray-700">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  id="original_price"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`mt-1 input ${errors.original_price ? 'border-red-500' : ''}`}
                  placeholder="Optional"
                />
                {errors.original_price && (
                  <p className="mt-1 text-sm text-red-600">{errors.original_price}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 input"
                  placeholder="e.g., 2 kg, 3 loaves, 1 box"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`mt-1 input ${errors.location ? 'border-red-500' : ''}`}
                  placeholder="e.g., Downtown, North Side"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Images */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Images</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative">
                  <img 
                    src={url} 
                    alt={`Listing image ${index + 1}`} 
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <div>
                  <label className="block h-24 w-full border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      {uploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-gray-400" />
                          <span className="mt-1 text-xs text-gray-500">Add Image</span>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-500">
              Upload up to 5 images. Each image should be less than 5MB.
            </p>
          </div>
        </div>
        
        {/* Additional Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiry_date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleChange}
                className="mt-1 input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label htmlFor="pickup_times" className="block text-sm font-medium text-gray-700">
                Pickup Times
              </label>
              <input
                type="text"
                id="pickup_times"
                name="pickup_times"
                value={formData.pickup_times}
                onChange={handleChange}
                className="mt-1 input"
                placeholder="e.g., Weekdays 5-7pm, Saturday 10am-2pm"
              />
            </div>
            
            <div>
              <label htmlFor="pickup_instructions" className="block text-sm font-medium text-gray-700">
                Pickup Instructions
              </label>
              <textarea
                id="pickup_instructions"
                name="pickup_instructions"
                rows={2}
                value={formData.pickup_instructions}
                onChange={handleChange}
                className="mt-1 input"
                placeholder="e.g., Call when you arrive, Meet at the front door"
              />
            </div>
            
            <div>
              <label htmlFor="storage_instructions" className="block text-sm font-medium text-gray-700">
                Storage Instructions
              </label>
              <textarea
                id="storage_instructions"
                name="storage_instructions"
                rows={2}
                value={formData.storage_instructions}
                onChange={handleChange}
                className="mt-1 input"
                placeholder="e.g., Keep refrigerated, Consume within 2 days"
              />
            </div>
          </div>
        </div>
        
        {/* Dietary Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Dietary Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Options
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DIETARY_OPTIONS.map(option => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.dietary_info.includes(option)}
                      onChange={(e) => handleCheckboxChange(e, 'dietary_info')}
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergens
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {ALLERGENS.map(allergen => (
                  <label key={allergen} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={allergen}
                      checked={formData.allergens.includes(allergen)}
                      onChange={(e) => handleCheckboxChange(e, 'allergens')}
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{allergen}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit */}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3 text-sm">
              <p className="text-gray-500">
                By submitting this listing, you confirm that the information is accurate and the food is safe for consumption.
              </p>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Creating...
              </>
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
