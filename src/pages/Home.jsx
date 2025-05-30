import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, DollarSign, Clock } from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-primary-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Fresh produce"
          />
          <div className="absolute inset-0 bg-primary-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Reduce Food Waste, Save Money
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-primary-100">
            Connect with local businesses and individuals to purchase surplus food at discounted prices.
            Help reduce food waste while enjoying quality meals for less.
          </p>
          <div className="mt-10 flex space-x-4">
            <Link to="/listings" className="btn-primary btn-lg">
              Find Food
            </Link>
            <Link to="/register" className="btn-secondary btn-lg">
              List Your Food
            </Link>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How iFoodCycle Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Join our community and be part of the solution to food waste.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="flex justify-center">
                  <Leaf className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Reduce Waste</h3>
                <p className="mt-2 text-gray-500">
                  One-third of all food produced globally goes to waste. By purchasing surplus food, you're helping to reduce this waste.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="flex justify-center">
                  <DollarSign className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Save Money</h3>
                <p className="mt-2 text-gray-500">
                  Get quality food at discounted prices. Businesses offer surplus food at reduced rates rather than throwing it away.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="flex justify-center">
                  <Clock className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Act Fast</h3>
                <p className="mt-2 text-gray-500">
                  Food listings are time-sensitive. Browse available items and act quickly to secure your favorites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start saving?</span>
            <span className="block text-primary-300">Join iFoodCycle today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register" className="btn-primary btn-lg">
                Sign up for free
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/listings" className="btn-secondary btn-lg">
                Browse listings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">"I've saved over $200 this month buying surplus food from local restaurants. The quality is amazing!"</p>
              <div className="mt-4">
                <p className="font-medium text-gray-900">Sarah J.</p>
                <p className="text-gray-500 text-sm">Student</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">"As a bakery owner, I can now sell bread that would otherwise go to waste. It's a win-win for everyone."</p>
              <div className="mt-4">
                <p className="font-medium text-gray-900">Michael T.</p>
                <p className="text-gray-500 text-sm">Business Owner</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">"I love the variety of food available. It's helped me try new things while being environmentally conscious."</p>
              <div className="mt-4">
                <p className="font-medium text-gray-900">Elena R.</p>
                <p className="text-gray-500 text-sm">Food Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
