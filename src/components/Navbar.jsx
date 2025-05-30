import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, ShoppingBag, User, LogOut, Home, BarChart2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-500 text-white mr-2">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className={`font-display font-bold text-xl ${scrolled ? 'text-primary-600' : 'text-primary-600'}`}>
                iFoodCycle
              </span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <NavLink to="/" isActive={isActive('/')} scrolled={scrolled}>
                <Home className="h-4 w-4 mr-1" />
                Home
              </NavLink>
              <NavLink to="/listings" isActive={isActive('/listings')} scrolled={scrolled}>
                <ShoppingBag className="h-4 w-4 mr-1" />
                Browse Food
              </NavLink>
              <NavLink to="/how-it-works" isActive={isActive('/how-it-works')} scrolled={scrolled}>
                <BarChart2 className="h-4 w-4 mr-1" />
                How It Works
              </NavLink>
              {user && (
                <NavLink to="/dashboard" isActive={isActive('/dashboard')} scrolled={scrolled}>
                  <User className="h-4 w-4 mr-1" />
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center">
                <div className="mr-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium text-sm">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="btn btn-primary btn-sm flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium text-sm transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${scrolled ? 'text-gray-700' : 'text-primary-600'}`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="pt-2 pb-3 space-y-1 px-4">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-5 w-5 mr-2" />
              Home
            </MobileNavLink>
            <MobileNavLink to="/listings" onClick={() => setIsMenuOpen(false)}>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Browse Food
            </MobileNavLink>
            <MobileNavLink to="/how-it-works" onClick={() => setIsMenuOpen(false)}>
              <BarChart2 className="h-5 w-5 mr-2" />
              How It Works
            </MobileNavLink>
            {user && (
              <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <User className="h-5 w-5 mr-2" />
                Dashboard
              </MobileNavLink>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="space-y-1 px-4">
                <div className="flex items-center py-2">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-4 flex flex-col">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-md"
                >
                  <User className="h-5 w-5 mr-2" />
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary mt-2"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, isActive, scrolled }) => {
  return (
    <Link
      to={to}
      className={`flex items-center text-sm font-medium transition-colors duration-200 ${
        isActive 
          ? 'text-primary-600 border-b-2 border-primary-500' 
          : scrolled 
            ? 'text-gray-700 hover:text-primary-600 border-b-2 border-transparent' 
            : 'text-gray-700 hover:text-primary-600 border-b-2 border-transparent'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center py-2 px-3 text-base font-medium rounded-md ${
        isActive 
          ? 'text-primary-600 bg-primary-50' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
