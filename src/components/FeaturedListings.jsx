import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ListingCard from './ListingCard';

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - in a real app, this would come from your API
    const mockListings = [
      {
        id: 1,
        title: "Fresh Bakery Bundle",
        description: "Assortment of fresh bread, pastries, and cookies from our bakery.",
        price: 5.99,
        location: "Downtown Bakery, 123 Main St",
        category: "Bakery",
        dietary_info: ["Vegetarian"],
        images: ["https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
        expiry_date: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        profiles: {
          name: "Downtown Bakery",
          avatar_url: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
      },
      {
        id: 2,
        title: "Organic Produce Box",
        description: "Mix of seasonal organic vegetables and fruits.",
        price: 8.50,
        location: "Green Farm Market, 456 Oak Ave",
        category: "Produce",
        dietary_info: ["Organic", "Vegan", "Gluten-Free"],
        images: ["https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
        expiry_date: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
        created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        profiles: {
          name: "Green Farm Market",
          avatar_url: "https://images.pexels.com/photos/5273044/pexels-photo-5273044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
      },
      {
        id: 3,
        title: "Restaurant Meal Kit",
        description: "Ready-to-heat gourmet pasta dinner for two with garlic bread.",
        price: 12.99,
        location: "Bella's Italian, 789 Elm St",
        category: "Prepared Meals",
        dietary_info: ["Vegetarian"],
        images: ["https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
        expiry_date: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
        created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        profiles: {
          name: "Bella's Italian",
          avatar_url: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
      },
      {
        id: 4,
        title: "Surplus Dairy Bundle",
        description: "Assortment of yogurt, cheese, and milk approaching best-by date.",
        price: 0,
        location: "Community Grocery, 101 Pine St",
        category: "Dairy",
        dietary_info: ["Vegetarian"],
        images: ["https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
        expiry_date: new Date(Date.now() + 21600000).toISOString(), // 6 hours from now
        created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
        profiles: {
          name: "Community Grocery",
          avatar_url: null
        }
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setListings(mockListings);
      setLoading(false);
    }, 500);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Food Listings</h2>
          <Link to="/listings" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
            View all listings
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {listings.map((listing) => (
              <motion.div key={listing.id} variants={item}>
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Join thousands of users already reducing food waste in their communities.
          </p>
          <Link to="/register" className="btn btn-primary">
            Sign up and start browsing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
