import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, DollarSign, Leaf, ArrowRight, Star, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-1 mb-6">
                Reduce Food Waste, <span className="gradient-text">Save Money</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with local businesses offering surplus food at discounted prices. 
                Join our community in the fight against food waste while enjoying quality meals for less.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/listings" className="btn btn-primary btn-lg">
                  Browse Food
                </Link>
                <Link to="/how-it-works" className="btn btn-secondary btn-lg">
                  How It Works
                </Link>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-700 font-medium text-xs">U{i}</span>
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Trusted by <span className="font-semibold">2,000+</span> users
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
                <img 
                  src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Fresh food selection" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 rounded-md p-2">
                      <ShoppingBag className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-900">Local Bakery Bundle</h3>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs font-medium text-gray-500 line-through mr-2">$24.99</span>
                        <span className="text-sm font-bold text-primary-600">$9.99</span>
                        <span className="ml-2 badge badge-green">60% OFF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-soft p-4 animate-float">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">Saved this month</p>
                    <p className="text-lg font-bold text-green-600">1,240 kg CO₂</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 mb-4">How iFoodCycle Works</h2>
            <p className="text-lg text-gray-600">
              Join our community of conscious consumers and businesses to reduce food waste together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingBag className="h-6 w-6 text-primary-600" />,
                title: "Browse Listings",
                description: "Explore discounted food items from local businesses that would otherwise go to waste."
              },
              {
                icon: <Clock className="h-6 w-6 text-primary-600" />,
                title: "Reserve & Pickup",
                description: "Reserve your items and pick them up during the specified timeframe."
              },
              {
                icon: <DollarSign className="h-6 w-6 text-primary-600" />,
                title: "Save Money & Reduce Waste",
                description: "Enjoy quality food at discounted prices while helping reduce food waste."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover-card-rise p-6"
              >
                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="heading-4 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <Link to="/how-it-works" className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-2">Featured Listings</h2>
            <Link to="/listings" className="btn btn-primary">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title: "Organic Vegetable Box",
                business: "Green Grocer",
                originalPrice: 24.99,
                discountPrice: 9.99,
                discount: 60,
                timeLeft: "3 hours",
                distance: "0.8 miles"
              },
              {
                image: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title: "Bakery Surprise Box",
                business: "Sunshine Bakery",
                originalPrice: 18.50,
                discountPrice: 7.99,
                discount: 57,
                timeLeft: "5 hours",
                distance: "1.2 miles"
              },
              {
                image: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title: "Deli Sandwich Pack",
                business: "Urban Deli",
                originalPrice: 15.99,
                discountPrice: 6.49,
                discount: 59,
                timeLeft: "2 hours",
                distance: "0.5 miles"
              }
            ].map((listing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden hover-card-rise"
              >
                <div className="relative h-48">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 badge badge-green">
                    {listing.discount}% OFF
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="heading-4 mb-1">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {listing.business}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-medium text-gray-500 line-through mr-2">
                        ${listing.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-lg font-bold text-primary-600">
                        ${listing.discountPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {listing.timeLeft} left
                    </div>
                  </div>
                  <Link to="/listings" className="btn btn-primary w-full">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6">Our Impact Together</h2>
              <p className="text-lg text-gray-600 mb-8">
                Every purchase through iFoodCycle contributes to reducing food waste and its environmental impact. 
                Together, we're making a difference one meal at a time.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: <Leaf className="h-6 w-6 text-green-600" />,
                    title: "5,280 kg",
                    description: "CO₂ emissions saved"
                  },
                  {
                    icon: <ShoppingBag className="h-6 w-6 text-primary-600" />,
                    title: "12,450",
                    description: "Meals rescued"
                  },
                  {
                    icon: <Users className="h-6 w-6 text-blue-600" />,
                    title: "320+",
                    description: "Participating businesses"
                  },
                  {
                    icon: <DollarSign className="h-6 w-6 text-yellow-600" />,
                    title: "$45,000+",
                    description: "Saved by consumers"
                  }
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center mb-3 shadow-soft">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.title}</h3>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/how-it-works" className="btn btn-primary">
                Learn More About Our Impact
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
                <img 
                  src="https://images.pexels.com/photos/6646233/pexels-photo-6646233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Environmental impact" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Join Our Mission</h3>
                  <p className="text-white/90 mb-4">
                    Every action counts in the fight against food waste.
                  </p>
                  <Link to="/register" className="inline-flex items-center text-white font-medium hover:text-primary-200 transition-colors">
                    Sign up now <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-soft p-4 animate-float">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">Join our community</p>
                    <p className="text-lg font-bold text-blue-600">2,000+ members</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Ready to Reduce Food Waste and Save Money?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of conscious consumers and businesses in our mission to reduce food waste while enjoying quality food at discounted prices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg">
                Sign Up Now
              </Link>
              <Link to="/listings" className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 btn-lg">
                Browse Food
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
