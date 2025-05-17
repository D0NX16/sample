import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CreditCard, AlertCircle } from 'lucide-react';
import type { Booking } from '../../contexts/ParkingContext';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // Format date strings
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get appropriate status badge color
  const getStatusBadgeClass = () => {
    switch (booking.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{booking.parkingName}</h3>
          <div className="flex items-center text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{formatDate(booking.startTime)}</span>
          </div>
        </div>
        <span className={`badge ${getStatusBadgeClass()}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      
      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Start Time</p>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <p>{formatTime(booking.startTime)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">End Time</p>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <p>{formatTime(booking.endTime)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
            <p className="text-gray-700">Amount</p>
          </div>
          <p className="font-semibold">${booking.totalAmount.toFixed(2)}</p>
        </div>
      </div>
      
      {booking.status === 'pending' || booking.status === 'confirmed' ? (
        <div className="mt-4 flex justify-end space-x-3">
          <Link 
            to={`/parking/${booking.parkingId}`}
            className="btn-outline text-sm"
          >
            View Details
          </Link>
          {booking.status !== 'cancelled' && (
            <button className="btn-secondary text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Contact Owner
            </button>
          )}
        </div>
      ) : (
        <Link 
          to={`/parking/${booking.parkingId}`}
          className="btn-outline text-sm w-full text-center mt-4"
        >
          View Parking Space
        </Link>
      )}
    </div>
  );
};

export default BookingCard;