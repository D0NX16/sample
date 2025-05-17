import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Car, Clock, CreditCard, MapPin } from 'lucide-react';
import { useParking } from '../contexts/ParkingContext';
import ParkingCard from '../components/parking/ParkingCard';

const HomePage: React.FC = () => {
  const { parkingSpaces } = useParking();
  const featuredSpaces = parkingSpaces.filter(space => space.isAvailable).slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>
          <img 
            src="https://images.pexels.com/photos/5465527/pexels-photo-5465527.jpeg" 
            alt="Parking Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-40 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find the Perfect Parking Spot Near You
            </h1>
            <p className="text-xl md:text-2xl text-white text-opacity-90 mb-8">
              Rent parking spaces from local hosts or share your own unused space to earn extra income.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/search" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-center py-3 px-6 text-lg">
                Find Parking
              </Link>
              <Link to="/add-parking" className="btn-outline border-white text-white hover:bg-white/20 text-center py-3 px-6 text-lg">
                List Your Space
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg -mt-16 relative z-20 p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-2/3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter location to find parking..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <Link to="/search" className="w-full md:w-1/3 btn-primary py-3 flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Parking</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Zaparky Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to find or share parking spaces in your community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Search</h3>
              <p className="text-gray-600">
                Find available parking spots near your destination with our easy-to-use search tools.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Book</h3>
              <p className="text-gray-600">
                Reserve your parking spot in advance with just a few clicks and secure your space.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Pay</h3>
              <p className="text-gray-600">
                Hassle-free payments after you're done parking, with transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      {featuredSpaces.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Parking Spaces</h2>
              <Link to="/search" className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSpaces.map(space => (
                <ParkingCard key={space.id} parking={space} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Parking Space</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Turn your unused parking space into extra income by sharing it with drivers in your area.
          </p>
          <Link to="/add-parking" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 text-lg inline-flex items-center">
            List Your Space
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;