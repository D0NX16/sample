import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Car, Search, User, Menu, X, LogOut, Plus, MapPin, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for transparent/solid header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">ParkShare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/search" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Find Parking</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/add-parking" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Your Space</span>
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors">
                    <User className="h-4 w-4" />
                    <span>{user?.name || 'Account'}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block transition-all duration-200">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/my-listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Listings</Link>
                    <Link to="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-500 transition-colors">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/search" 
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
            >
              <Search className="h-5 w-5 text-blue-500" />
              <span>Find Parking</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/add-parking" 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <Plus className="h-5 w-5 text-blue-500" />
                  <span>List Your Space</span>
                </Link>
                
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <User className="h-5 w-5 text-blue-500" />
                  <span>Profile</span>
                </Link>
                
                <Link 
                  to="/my-listings" 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>My Listings</span>
                </Link>
                
                <Link 
                  to="/my-bookings" 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span>My Bookings</span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg w-full text-left"
                >
                  <LogOut className="h-5 w-5 text-blue-500" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block p-2 hover:bg-gray-50 rounded-lg"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block bg-blue-500 text-white p-2 rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;