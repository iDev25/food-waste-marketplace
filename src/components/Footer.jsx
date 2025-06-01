import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12a9 9 0 0 0-9-9v9h9z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12 12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">GrubLinX</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-md">
              GrubLinX connects surplus food with people who need it. Our mission is to reduce food waste, support communities, and create a more sustainable food system.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:info@grublinx.com" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-base text-gray-600 hover:text-gray-900">
                  Find Food
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-base text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-base text-gray-600 hover:text-gray-900">
                  Add Listing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} GrubLinX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
