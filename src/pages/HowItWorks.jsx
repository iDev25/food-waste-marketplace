import { Link } from 'react-router-dom'
import { ShoppingBag, Users, Leaf, Clock, MapPin, MessageSquare, AlertTriangle, Heart, DollarSign, Award } from 'lucide-react'

const HowItWorks = () => {
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
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">How iFoodCycle Works</h1>
          <p className="mt-6 max-w-3xl text-xl text-primary-100">
            Our platform connects surplus food with people who need it, reducing waste and building community. Learn how you can participate in creating a more sustainable food system.
          </p>
        </div>
      </div>

      {/* Process overview */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">The Process</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Simple steps to reduce food waste
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Whether you're a business with surplus food or someone looking for affordable groceries, our platform makes it easy to connect.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">List surplus food</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Businesses and individuals can easily list their surplus food items, set prices (or offer for free), and manage pickups.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Connect with buyers</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Individuals, businesses, and non-profits can browse available food items, filter by preferences, and arrange pickups.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <Leaf className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Reduce waste, help the planet</h3>
                  <p className="mt-2 text-base text-gray-500">
                    By connecting surplus food with those who need it, we reduce waste, save resources, and build a more sustainable food system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For food providers */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                For Food Providers
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Whether you're a restaurant, grocery store, bakery, farm, or individual with extra food, you can make a difference while recovering costs.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recover costs</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Set your own prices for surplus food. Recover some costs while preventing waste.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Quick and easy</h3>
                    <p className="mt-2 text-base text-gray-500">
                      List items in minutes. Our platform handles the rest, connecting you with nearby buyers.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                      <Heart className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Community impact</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Build goodwill and connect with your community while helping the environment.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Start listing food
                </Link>
                <Link
                  to="/provider-faq"
                  className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Learn more
                </Link>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Restaurant staff with food"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For food seekers */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:order-2">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                For Food Seekers
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Find affordable, quality food while helping reduce waste. Perfect for budget-conscious individuals, families, and organizations.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Find local food</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Browse listings from nearby businesses and individuals. Filter by distance, category, and price.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Quality at a discount</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Get high-quality food at significantly reduced prices. Many items are perfectly good but would otherwise go to waste.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Direct communication</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Message providers directly with questions about ingredients, allergens, or pickup details.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link
                  to="/listings"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Browse food now
                </Link>
                <Link
                  to="/seeker-faq"
                  className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Learn more
                </Link>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0 lg:order-1">
              <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Family with groceries"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food safety */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Food Safety First
            </h2>
            <p className="mt-3 text-xl text-primary-200 sm:mt-4">
              We take food safety seriously. Here's how we ensure all food shared on our platform is safe.
            </p>
          </div>
          <div className="mt-10 max-w-5xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Provider Guidelines</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          All food providers must follow our strict guidelines for food safety, including proper storage, handling, and accurate expiration information.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Verification Process</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Business accounts are verified to ensure they meet health department standards. Individual providers must complete food safety training.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Community Ratings</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Our rating system helps maintain quality. Providers with consistently high ratings for food safety and quality are highlighted.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Clear Information</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          All listings must include clear information about ingredients, allergens, best-by dates, and storage requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Impact stats */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Impact
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Together, our community is making a real difference in reducing food waste and helping people access affordable food.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Food Saved (kg)
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-primary-600">15,000+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Active Users
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-primary-600">2,500+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Communities Served
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-primary-600">50+</dd>
            </div>
          </dl>
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-500">
              Every kilogram of food saved prevents approximately 2.5 kg of CO2 emissions.
            </p>
            <p className="mt-2 text-lg text-gray-500">
              That means our community has prevented over <span className="font-bold text-primary-600">37,500 kg</span> of CO2 from entering the atmosphere!
            </p>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Frequently asked questions
          </h2>
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-2">
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Is the food on iFoodCycle safe to eat?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes. All food listed on our platform must meet our safety guidelines. Food is typically approaching its best-by date but is still perfectly good to eat, or has minor cosmetic imperfections that don't affect quality or safety.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  How do I know if a listing contains allergens?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Providers are required to list all major allergens in their food. You can also message them directly with specific questions about ingredients or preparation methods.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Can I list homemade food?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  In most areas, yes, but you must follow local cottage food laws and our safety guidelines. All homemade food must be clearly labeled as such, with a complete ingredient list.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What if I can't afford to pay for food?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Many listings on our platform are free. We also partner with local food banks and community organizations to ensure food reaches those who need it most, regardless of ability to pay.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  How do pickups work?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  After reserving an item, you'll arrange a pickup time directly with the provider. Most pickups happen at the business location or a mutually agreed meeting spot for individual providers.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Can organizations use iFoodCycle?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Absolutely! We welcome food banks, community kitchens, and other organizations. Contact us for information about our organization accounts with additional features.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to reduce food waste?</span>
            <span className="block">Join iFoodCycle today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-200">
            Whether you have food to share or are looking for affordable options, you can make a difference.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
              >
                Sign up for free
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Browse food now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
