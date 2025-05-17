import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParking } from '../contexts/ParkingContext';
import { Calendar, Clock, FilterX } from 'lucide-react';
import BookingCard from '../components/booking/BookingCard';

const BookingsPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserBookings } = useParking();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  
  const myBookings = user ? getUserBookings(user.id) : [];
  
  // Filter bookings based on active tab
  const filteredBookings = myBookings.filter(booking => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return booking.status === 'confirmed' || booking.status === 'pending';
    return booking.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex overflow-x-auto space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === 'upcoming' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === 'completed' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === 'cancelled' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
        
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              {activeTab === 'all' ? (
                <Calendar className="h-8 w-8 text-blue-600" />
              ) : activeTab === 'upcoming' ? (
                <Clock className="h-8 w-8 text-blue-600" />
              ) : (
                <FilterX className="h-8 w-8 text-blue-600" />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">No {activeTab !== 'all' ? activeTab : ''} Bookings Found</h2>
            <p className="text-gray-600 mb-6">
              {activeTab === 'all' 
                ? "You haven't made any bookings yet. Find and book parking spaces to see them here."
                : `You don't have any ${activeTab} bookings.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;