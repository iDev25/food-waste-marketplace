import { motion } from 'framer-motion';
import { ShoppingBag, Users, Clock, Check, MapPin } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "List Surplus Food",
      description: "Businesses and individuals can easily list their surplus food items, set prices (or offer for free), and manage pickups.",
      color: "bg-primary-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Browse & Reserve",
      description: "Browse available food items near you, filter by preferences, and reserve what you want.",
      color: "bg-secondary-500"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Pick Up Food",
      description: "Arrange a convenient pickup time and location with the provider.",
      color: "bg-indigo-500"
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Enjoy & Reduce Waste",
      description: "Enjoy delicious food at a discount while helping reduce food waste in your community.",
      color: "bg-green-500"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How iFoodCycle Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to connect surplus food with people who can use it, reducing waste and helping the community.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="bg-white rounded-xl shadow-soft p-6 relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`absolute top-0 left-0 w-2 h-full ${step.color}`}></div>
              <div className={`h-12 w-12 rounded-full ${step.color} text-white flex items-center justify-center mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <div className={`w-full h-full rounded-tl-full ${step.color}`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <a href="/listings" className="btn btn-primary btn-lg">
            Browse Available Food
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
