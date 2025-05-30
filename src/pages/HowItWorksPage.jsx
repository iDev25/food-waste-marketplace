import { motion } from 'framer-motion';
import { ShoppingBag, Users, Clock, Check, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HowItWorks from '../components/HowItWorks';

const HowItWorksPage = () => {
  return (
    <div className="pt-16">
      {/* Hero section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white font-display sm:text-5xl"
            >
              How iFoodCycle Works
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto"
            >
              Our platform makes it easy to connect surplus food with people who need it, reducing waste and helping the community.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Process overview */}
      <HowItWorks />

      {/* Detailed steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Detailed Process</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about how our platform works for both food providers and recipients.
            </p>
          </div>

          {/* For Providers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary-600 mb-8">For Food Providers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Create an Account</h4>
                  <p className="text-gray-600 mb-4">
                    Sign up for a free account as a business or individual food provider. Verify your email and complete your profile with your location and contact details.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Quick and easy registration process
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Secure account with privacy controls
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">List Your Surplus Food</h4>
                  <p className="text-gray-600 mb-4">
                    Create detailed listings for your surplus food items. Include photos, descriptions, quantity, expiration dates, and any dietary information.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Set your own prices or offer items for free
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Specify pickup times and locations
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Manage Reservations</h4>
                  <p className="text-gray-600 mb-4">
                    Receive notifications when someone reserves your food. Communicate with them through our secure messaging system to coordinate pickup details.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Accept or decline reservation requests
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Manage multiple reservations efficiently
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Complete the Exchange</h4>
                  <p className="text-gray-600 mb-4">
                    Meet the recipient at the agreed time and location. Hand over the food items and mark the transaction as complete in the app.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Receive ratings and reviews from recipients
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Track your impact with detailed statistics
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* For Recipients */}
          <div>
            <h3 className="text-2xl font-bold text-secondary-600 mb-8">For Food Recipients</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Create an Account</h4>
                  <p className="text-gray-600 mb-4">
                    Sign up as an individual or organization looking for food. Complete your profile with your location and preferences.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Set dietary preferences and restrictions
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Define your search radius
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Browse Available Food</h4>
                  <p className="text-gray-600 mb-4">
                    Search for available food items near you. Filter by category, price, distance, and dietary preferences to find what you need.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      View detailed information about each listing
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Save favorite listings for later
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Reserve Food Items</h4>
                  <p className="text-gray-600 mb-4">
                    Reserve the food items you want. Communicate with the provider through our messaging system to arrange pickup details.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Receive confirmation notifications
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Get reminders about upcoming pickups
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Pick Up & Enjoy</h4>
                  <p className="text-gray-600 mb-4">
                    Meet the provider at the agreed time and location. Pick up your food items and mark the transaction as complete in the app.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Rate and review your experience
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                      Track your savings and environmental impact
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about using iFoodCycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is iFoodCycle free to use?</h3>
              <p className="text-gray-600">
                Yes, iFoodCycle is completely free to use for both food providers and recipients. We do not charge any fees for listing or reserving food items.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I know the food is safe?</h3>
              <p className="text-gray-600">
                Food providers must follow our safety guidelines and include expiration dates on all listings. We also have a rating and review system to help ensure quality and safety.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I list prepared meals?</h3>
              <p className="text-gray-600">
                Yes, you can list prepared meals, but you must include detailed information about ingredients, preparation date, and storage instructions to ensure food safety.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do payments work?</h3>
              <p className="text-gray-600">
                Currently, all payments are handled directly between providers and recipients at the time of pickup. We recommend cash for simplicity, but providers may accept other payment methods.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can organizations use iFoodCycle?</h3>
              <p className="text-gray-600">
                Absolutely! We welcome food banks, community kitchens, and other organizations to use our platform to source or distribute food. Contact us for special organization accounts.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What if someone doesn't show up for pickup?</h3>
              <p className="text-gray-600">
                If a recipient doesn't show up, providers can mark the reservation as "no-show" in the app. Repeated no-shows may result in account restrictions for recipients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to reduce food waste?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users already making a difference in their communities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-primary-50">
              Sign up now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/listings" className="btn bg-primary-700 text-white hover:bg-primary-800">
              Browse available food
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
