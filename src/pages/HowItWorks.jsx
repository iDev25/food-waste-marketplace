import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Users, Leaf, Clock, MapPin, MessageSquare, AlertTriangle, Heart, DollarSign, Award, Check, ArrowRight, Star } from 'lucide-react'

const HowItWorks = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-primary-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-multiply filter brightness-50"
            src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Food waste reduction"
          />
          <div className="absolute inset-0 bg-primary-700 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">How GrubLinX Works</h1>
          <p className="mt-6 max-w-3xl text-xl text-primary-100">
            Our platform connects surplus food with people who need it, reducing waste and building community. Learn how you can participate in creating a more sustainable food system.
          </p>
        </div>
      </div>

      {/* Interactive Process Steps */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-3">
              Simple Process
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              How It Works in 4 Easy Steps
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Whether you're a business with surplus food or someone looking for affordable groceries, our platform makes it easy to connect.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-100 transform -translate-x-1/2 z-0"></div>
            
            {/* Steps */}
            <div className="space-y-16 lg:space-y-28 relative z-10">
              {[
                {
                  icon: <ShoppingBag className="h-6 w-6" />,
                  title: "List surplus food",
                  description: "Businesses and individuals can easily list their surplus food items, set prices (or offer for free), and manage pickups.",
                  image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  color: "bg-primary-500",
                  features: [
                    "Quick listing process takes less than 2 minutes",
                    "Set your own prices or offer items for free",
                    "Include photos and detailed descriptions",
                    "Specify pickup times that work for you"
                  ]
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Connect with buyers",
                  description: "Individuals, businesses, and non-profits can browse available food items, filter by preferences, and arrange pickups.",
                  image: "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  color: "bg-secondary-500",
                  features: [
                    "Browse food by category, distance, or price",
                    "Reserve items with a simple click",
                    "Communicate directly with providers",
                    "Get notifications when new items are available"
                  ]
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Arrange pickup",
                  description: "Coordinate convenient pickup times and locations directly through our platform's messaging system.",
                  image: "https://images.pexels.com/photos/7262897/pexels-photo-7262897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  color: "bg-indigo-500",
                  features: [
                    "Secure in-app messaging system",
                    "Flexible pickup scheduling",
                    "Map integration for easy navigation",
                    "Contactless pickup options available"
                  ]
                },
                {
                  icon: <Leaf className="h-6 w-6" />,
                  title: "Reduce waste, help the planet",
                  description: "By connecting surplus food with those who need it, we reduce waste, save resources, and build a more sustainable food system.",
                  image: "https://images.pexels.com/photos/7262458/pexels-photo-7262458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  color: "bg-green-500",
                  features: [
                    "Track your personal environmental impact",
                    "Earn badges and rewards for participation",
                    "Join a community of like-minded individuals",
                    "Help reduce CO₂ emissions with every transaction"
                  ]
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-12 w-12 rounded-full ${step.color} text-white shadow-lg`}>
                        {step.icon}
                      </div>
                      <span className="ml-4 text-sm font-bold text-gray-500 uppercase tracking-wide">Step {index + 1}</span>
                    </div>
                    
                    <h3 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">
                      {step.title}
                    </h3>
                    
                    <p className="mt-3 text-lg text-gray-500">
                      {step.description}
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`flex-shrink-0 h-6 w-6 rounded-full ${step.color} bg-opacity-20 flex items-center justify-center`}>
                            <Check className={`h-4 w-4 ${step.color.replace('bg-', 'text-')}`} />
                          </div>
                          <span className="ml-3 text-base text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      {index === 0 ? (
                        <Link to="/register" className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${step.color} hover:${step.color.replace('bg-', 'bg-')} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${step.color.replace('bg-', 'ring-')}`}>
                          Start listing food
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      ) : index === 1 ? (
                        <Link to="/listings" className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${step.color} hover:${step.color.replace('bg-', 'bg-')} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${step.color.replace('bg-', 'ring-')}`}>
                          Browse available food
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  
                  <div className={`mt-10 lg:mt-0 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative mx-auto w-full rounded-lg shadow-lg overflow-hidden lg:max-w-md">
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 mix-blend-multiply rounded-lg"></span>
                      <img
                        className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
                        src={step.image}
                        alt={step.title}
                      />
                      <div className="absolute inset-0 border border-gray-200 rounded-lg"></div>
                      
                      {/* Step number badge */}
                      <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-900">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-3">
              Benefits
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Why Use GrubLinX?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our platform offers unique advantages for both food providers and food seekers.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* For Food Providers */}
            <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-6">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">For Food Providers</h3>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-500 text-white">
                        <DollarSign className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Recover costs</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Set your own prices for surplus food. Recover some costs while preventing waste.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-500 text-white">
                        <Clock className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Quick and easy</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        List items in minutes. Our platform handles the rest, connecting you with nearby buyers.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-500 text-white">
                        <Heart className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Community impact</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Build goodwill and connect with your community while helping the environment.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Start listing food
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* For Food Seekers */}
            <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 text-secondary-600 mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">For Food Seekers</h3>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary-500 text-white">
                        <MapPin className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Find local food</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Browse listings from nearby businesses and individuals. Filter by distance, category, and price.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary-500 text-white">
                        <Award className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Quality at a discount</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Get high-quality food at significantly reduced prices. Many items are perfectly good but would otherwise go to waste.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary-500 text-white">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Direct communication</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Message providers directly with questions about ingredients, allergens, or pickup details.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link
                    to="/listings"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                  >
                    Browse food now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* For the Environment */}
            <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-6">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">For the Environment</h3>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 22H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 13C15.866 13 19 10.3137 19 7C19 3.68629 15.866 1 12 1C8.13401 1 5 3.68629 5 7C5 10.3137 8.13401 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Reduce CO₂ emissions</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Food waste in landfills produces methane, a potent greenhouse gas. Reducing waste helps combat climate change.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 20V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.63599 5.63599L6.34999 6.34999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.65 17.65L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.63599 18.364L6.34999 17.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.65 6.34999L18.364 5.63599" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Conserve resources</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Food production uses water, energy, and land. By reducing waste, we maximize the value of these resources.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Build sustainable habits</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Using GrubLinX helps create a culture of sustainability and mindful consumption in your community.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link
                    to="/impact"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Learn about our impact
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Food safety */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-gradient-to-b from-gray-50 to-primary-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-3">
              Safety First
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Food Safety is Our Priority
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              We take food safety seriously. Here's how we ensure all food shared on our platform is safe.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-100 text-yellow-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-bold text-gray-900">Provider Guidelines</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  All food providers must follow our strict guidelines for food safety, including proper storage, handling, and accurate expiration information.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Clear labeling of all ingredients and allergens</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Accurate best-by and expiration dates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Proper temperature control during storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Hygienic handling and packaging</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.0799V11.9999C21.9988 14.1563 21.3005 16.2545 20.0093 17.9817C18.7182 19.7088 16.9033 20.9723 14.8354 21.5838C12.7674 22.1952 10.5573 22.1218 8.53447 21.3746C6.51168 20.6274 4.78465 19.246 3.61096 17.4369C2.43727 15.6279 1.87979 13.4879 2.02168 11.3362C2.16356 9.18443 2.99721 7.13619 4.39828 5.49694C5.79935 3.85768 7.69279 2.71525 9.79619 2.24001C11.8996 1.76477 14.1003 1.9822 16.07 2.85986" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-bold text-gray-900">Verification Process</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Business accounts are verified to ensure they meet health department standards. Individual providers must complete food safety training.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Business license verification</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Health department compliance check</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Food safety certification for individuals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Regular account reviews and monitoring</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-bold text-gray-900">Community Ratings</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our rating system helps maintain quality. Providers with consistently high ratings for food safety and quality are highlighted.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Transparent user reviews and ratings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Verified purchase review system</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Special badges for top-rated providers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Immediate action on safety concerns</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-bold text-gray-900">Clear Information</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  All listings must include clear information about ingredients, allergens, best-by dates, and storage requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Mandatory ingredient and allergen disclosure</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Clear expiration and best-by dates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Storage and handling instructions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Photo requirements for accurate representation</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Impact stats */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-primary-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-3">
              Making a Difference
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Impact
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Together, our community is making a real difference in reducing food waste and helping people access affordable food.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                number: "15,000+",
                label: "Food Saved (kg)",
                icon: <ShoppingBag className="h-6 w-6 text-primary-500" />,
                color: "bg-primary-50 border-primary-200"
              },
              {
                number: "2,500+",
                label: "Active Users",
                icon: <Users className="h-6 w-6 text-secondary-500" />,
                color: "bg-secondary-50 border-secondary-200"
              },
              {
                number: "50+",
                label: "Communities Served",
                icon: <MapPin className="h-6 w-6 text-indigo-500" />,
                color: "bg-indigo-50 border-indigo-200"
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={item}
                className={`rounded-xl shadow-sm overflow-hidden border ${stat.color} p-8 text-center hover:shadow-md transition-shadow duration-300`}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-sm mb-6">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-lg text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn} className="mt-16 text-center bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmental Impact</h3>
            <p className="text-lg text-gray-600 mb-6">
              Every kilogram of food saved prevents approximately 2.5 kg of CO2 emissions.
            </p>
            <div className="inline-block bg-green-100 rounded-lg px-6 py-4 mb-6">
              <p className="text-lg text-gray-800">
                Our community has prevented over <span className="font-bold text-green-600">37,500 kg</span> of CO2 from entering the atmosphere!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-700">Equivalent to planting 1,875 trees</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.63599 5.63599L6.34999 6.34999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.65 17.65L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.63599 18.364L6.34999 17.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.65 6.34999L18.364 5.63599" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-700">Saved 150 million liters of water</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-3">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Find answers to common questions about using GrubLinX.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {[
              {
                question: "Is the food on GrubLinX safe to eat?",
                answer: "Yes. All food listed on our platform must meet our safety guidelines. Food is typically approaching its best-by date but is still perfectly good to eat, or has minor cosmetic imperfections that don't affect quality or safety."
              },
              {
                question: "How do I know if a listing contains allergens?",
                answer: "Providers are required to list all major allergens in their food. You can also message them directly with specific questions about ingredients or preparation methods."
              },
              {
                question: "Can I list homemade food?",
                answer: "In most areas, yes, but you must follow local cottage food laws and our safety guidelines. All homemade food must be clearly labeled as such, with a complete ingredient list."
              },
              {
                question: "What if I can't afford to pay for food?",
                answer: "Many listings on our platform are free. We also partner with local food banks and community organizations to ensure food reaches those who need it most, regardless of ability to pay."
              },
              {
                question: "How do pickups work?",
                answer: "After reserving an item, you'll arrange a pickup time directly with the provider. Most pickups happen at the business location or a mutually agreed meeting spot for individual providers."
              },
              {
                question: "Can organizations use GrubLinX?",
                answer: "Absolutely! We welcome food banks, community kitchens, and other organizations. Contact us for information about our organization accounts with additional features."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={item}
                className="mb-6"
              >
                <details className="group bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <summary className="flex justify-between items-center cursor-pointer p-6">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <div className="ml-6 flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-gray-200 group-open:rotate-180 transition-transform duration-200">
                      <ArrowRight className="h-4 w-4 text-gray-500 -rotate-90" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA section */}
      <section className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to reduce food waste?</span>
            <span className="block text-primary-200">Join GrubLinX today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors duration-300"
              >
                Sign up for free
              </Link>
            </div>
            <div className="inline-flex">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 transition-colors duration-300"
              >
                Browse food now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
