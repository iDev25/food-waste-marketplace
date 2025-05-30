import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, DollarSign, Leaf, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading-1 mb-6"
            >
              How <span className="gradient-text">iFoodCycle</span> Works
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              Learn how our platform connects consumers with local businesses to reduce food waste, 
              save money, and make a positive environmental impact.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-2 mb-4">Simple Steps to Reduce Food Waste</h2>
            <p className="text-gray-600">
              Our platform makes it easy to find and purchase surplus food from local businesses 
              that would otherwise go to waste.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 transform -translate-x-1/2"></div>
            
            {/* Steps */}
            {[
              {
                icon: <ShoppingBag className="h-6 w-6 text-primary-600" />,
                title: "Browse Listings",
                description: "Explore discounted food items from local businesses in your area. Filter by category, distance, or pickup time to find what you're looking for."
              },
              {
                icon: <Clock className="h-6 w-6 text-primary-600" />,
                title: "Reserve Items",
                description: "Reserve the items you want directly through the platform. Businesses will hold your items for pickup during the specified timeframe."
              },
              {
                icon: <CheckCircle className="h-6 w-6 text-primary-600" />,
                title: "Pick Up Your Order",
                description: "Visit the business during the pickup window and show your confirmation. Collect your items and enjoy knowing you've helped reduce food waste."
              },
              {
                icon: <DollarSign className="h-6 w-6 text-primary-600" />,
                title: "Save Money & Reduce Waste",
                description: "Enjoy quality food at discounted prices while helping reduce food waste and its environmental impact."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step number */}
                <div className="absolute top-0 left-1/2 md:left-auto md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 md:translate-x-0 z-10 md:static">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-white border-4 ${
                    index % 2 === 0 ? 'md:mr-8 border-primary-100' : 'md:ml-8 border-primary-100'
                  }`}>
                    <span className="text-primary-600 font-bold">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`bg-white rounded-xl shadow-soft p-6 mt-6 md:mt-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <div className={`flex items-center mb-4 ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mr-4 md:mr-0 md:ml-0">
                      {step.icon}
                    </div>
                    <h3 className="heading-3 md:hidden">{step.title}</h3>
                  </div>
                  <h3 className="heading-3 mb-3 hidden md:block">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-2 mb-4">Benefits of Using iFoodCycle</h2>
            <p className="text-gray-600">
              Our platform offers advantages for consumers, businesses, and the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
                title: "For Consumers",
                benefits: [
                  "Save up to 70% on quality food",
                  "Discover local businesses",
                  "Reduce your environmental footprint",
                  "Access exclusive deals",
                  "Convenient pickup options"
                ]
              },
              {
                icon: <ShoppingBag className="h-8 w-8 text-primary-600" />,
                title: "For Businesses",
                benefits: [
                  "Reduce food waste costs",
                  "Generate revenue from surplus",
                  "Attract new customers",
                  "Enhance sustainability profile",
                  "Simple inventory management"
                ]
              },
              {
                icon: <Leaf className="h-8 w-8 text-green-600" />,
                title: "For the Environment",
                benefits: [
                  "Reduce CO₂ emissions",
                  "Conserve water resources",
                  "Decrease landfill waste",
                  "Support sustainable practices",
                  "Create a circular food economy"
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover-card-rise"
              >
                <div className="h-16 w-16 rounded-lg bg-white shadow-soft flex items-center justify-center mb-6">
                  {category.icon}
                </div>
                <h3 className="heading-3 mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6">Our Environmental Impact</h2>
              <p className="text-lg text-gray-600 mb-8">
                Food waste is responsible for approximately 8% of global greenhouse gas emissions. 
                By rescuing surplus food, we're making a significant positive impact on the environment.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
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
              
              <p className="text-gray-600 mb-6">
                Every purchase through iFoodCycle contributes to these numbers. Together, we can make 
                a significant difference in reducing food waste and its environmental impact.
              </p>
              
              <Link to="/register" className="btn btn-primary">
                Join Our Mission
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
                  src="https://images.pexels.com/photos/7262897/pexels-photo-7262897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Environmental impact" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-soft p-4 animate-float">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">Sustainability Award</p>
                    <p className="text-xs text-gray-600">2023 Green Initiative</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find answers to common questions about using iFoodCycle.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What kind of food can I find on iFoodCycle?",
                answer: "You can find a wide variety of food items including fresh produce, bakery goods, prepared meals, dairy products, and more. All items are high-quality but would otherwise go to waste due to overstocking, approaching best-by dates, or aesthetic imperfections."
              },
              {
                question: "How much can I save on food?",
                answer: "Customers typically save between 50-70% off the original retail price. Discounts vary by listing and business, but all items are significantly reduced in price."
              },
              {
                question: "Is the food safe to eat?",
                answer: "Yes, all food listed on our platform is perfectly safe to consume. Items may be approaching their best-by date or have minor cosmetic imperfections, but they meet all food safety standards. Businesses are responsible for ensuring all listed items comply with local health regulations."
              },
              {
                question: "How do pickups work?",
                answer: "After reserving items, you'll receive a confirmation with pickup details. Visit the business during the specified pickup window, show your confirmation (in the app or email), and collect your items. Each business has its own pickup process, which is explained in the listing details."
              },
              {
                question: "Can I cancel my reservation?",
                answer: "Yes, you can cancel your reservation up to the cutoff time specified in the listing (typically a few hours before the pickup window). After that, cancellations may not be possible as businesses prepare items for pickup."
              },
              {
                question: "How can businesses join iFoodCycle?",
                answer: "Businesses can sign up through our website by clicking on 'For Businesses' and completing the registration process. Our team will review the application and provide access to the business dashboard where you can create listings and manage orders."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6 last:mb-0"
              >
                <details className="group bg-white rounded-xl shadow-soft overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <span className="ml-6 flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-gray-200 group-open:rotate-180 transition-transform duration-200">
                      <ArrowRight className="h-4 w-4 text-gray-500 -rotate-90" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Ready to Start Reducing Food Waste?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of conscious consumers and businesses in our mission to reduce food waste 
              while enjoying quality food at discounted prices.
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

export default HowItWorksPage;
