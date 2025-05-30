import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "As a restaurant owner, I used to throw away so much good food at the end of the day. Now I can list it on iFoodCycle and know it's going to people who will enjoy it.",
      author: "Sarah Johnson",
      role: "Local Bistro Owner",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "Our food bank has been able to source so much more fresh produce and prepared meals through iFoodCycle. It's been a game-changer for our community.",
      author: "Michael Rodriguez",
      role: "Community Food Bank Director",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "As a student on a budget, I love being able to get quality food at a discount. Plus, I feel good knowing I'm helping reduce waste!",
      author: "Emma Chen",
      role: "Graduate Student",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "iFoodCycle has transformed how our grocery store handles excess inventory. Instead of discarding food, we connect with people who need it.",
      author: "David Patel",
      role: "Grocery Store Manager",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Community Says</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the people who are making a difference with iFoodCycle.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10">
            <button
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-hidden py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-soft p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <div className="relative">
                      <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-primary-100">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <Quote className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <p className="text-gray-700 text-lg italic mb-6">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <div>
                      <p className="text-gray-900 font-semibold">{testimonials[currentIndex].author}</p>
                      <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-10">
            <button
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
