import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, MapPin } from 'lucide-react';

const ImpactStats = () => {
  const [stats, setStats] = useState({
    foodSaved: 0,
    activeUsers: 0,
    communitiesServed: 0
  });
  
  const targetStats = {
    foodSaved: 15000,
    activeUsers: 2500,
    communitiesServed: 50
  };
  
  useEffect(() => {
    const duration = 2000; // 2 seconds for the animation
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      
      setStats({
        foodSaved: Math.floor(targetStats.foodSaved * progress),
        activeUsers: Math.floor(targetStats.activeUsers * progress),
        communitiesServed: Math.floor(targetStats.communitiesServed * progress)
      });
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  const statItems = [
    {
      icon: <Leaf className="h-8 w-8 text-primary-200" />,
      value: stats.foodSaved.toLocaleString(),
      label: "Food Saved (kg)",
      color: "from-primary-600 to-primary-400"
    },
    {
      icon: <Users className="h-8 w-8 text-primary-200" />,
      value: stats.activeUsers.toLocaleString(),
      label: "Active Users",
      color: "from-secondary-500 to-secondary-300"
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary-200" />,
      value: stats.communitiesServed.toLocaleString(),
      label: "Communities Served",
      color: "from-indigo-600 to-indigo-400"
    }
  ];
  
  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Our Impact</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Together, we're making a difference in reducing food waste and fighting hunger.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 rounded-xl p-6 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className={`h-16 w-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{item.value}+</h3>
                <p className="text-gray-400">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
