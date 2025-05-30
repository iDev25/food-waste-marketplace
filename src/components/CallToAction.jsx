import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-4"
            >
              Ready to reduce food waste?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-100"
            >
              Join thousands of businesses and individuals already making a difference in their communities.
            </motion.p>
          </div>
          <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-0 md:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/register"
                className="btn bg-white text-primary-700 hover:bg-primary-50 w-full flex items-center justify-center"
              >
                Sign up for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/listings"
                className="btn bg-primary-800 text-white hover:bg-primary-900 w-full flex items-center justify-center"
              >
                Browse listings
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
