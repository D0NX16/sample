import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useParking } from '../contexts/ParkingContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  User, 
  Clock, 
  Phone, 
  Car, 
  CalendarCheck, 
  DollarSign, 
  Info, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const ParkingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getParkingSpaceById, createBooking } = useParking();
  const { user, isAuthenticated } = useAuth();
  
  const [parking, setParking] = useState(id ? getParkingSpaceById(id) : undefined);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingStartTime, setBookingStartTime] = useState('');
  const [bookingEndTime, setBookingEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const parkingSpace = getParkingSpaceById(id);
      setParking(parkingSpace);
      
      if (!parkingSpace) {
        navigate('/search');
      }
    }
  }, [id, getParkingSpaceById, navigate]);

  if (!parking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading parking space details...</p>
      </div>
    );
  }

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? parking.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => 
      prev === parking.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (!isAuthenticated || !user) {
        navigate('/login');
        return;
      }
      
      if (!bookingStartTime || !bookingEndTime) {
        throw new Error('Please select both start and end times');
      }
      
      const startTime = new Date(bookingStartTime);
      const endTime = new Date(bookingEndTime);
      
      if (startTime >= endTime) {
        throw new Error('End time must be after start time');
      }
      
      const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      const totalAmount = durationHours * parking.price;
      
      await createBooking({
        parkingId: parking.id,
        parkingName: parking.name,
        userId: user.id,
        userName: user.name,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: 'confirmed',
        totalAmount
      });
      
      navigate('/my-bookings');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to book parking space');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Images Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="relative h-96">
              {parking.images.length > 0 ? (
                <>
                  <img 
                    src={parking.images[activeImageIndex]} 
                    alt={parking.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {parking.images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                      </button>
                      
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
                      >
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {parking.images.map((_, index) => (
                          <button 
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`h-2 w-2 rounded-full ${
                              index === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Car className="h-20 w-20 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Details Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{parking.name}</h1>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-1 text-blue-500" />
                        <span>{parking.address}</span>
                      </div>
                    </div>
                    <span className={`badge ${parking.isAvailable ? 'badge-available' : 'badge-booked'}`}>
                      {parking.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-700">{parking.description}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Owner</p>
                          <p className="text-gray-600">{parking.ownerName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Contact</p>
                          <p className="text-gray-600">{parking.contactInfo}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Price</p>
                          <p className="text-gray-600">${parking.price} per hour</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Availability</p>
                          <p className="text-gray-600">{parking.isAvailable ? '24/7' : 'Currently Booked'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-gray-100 h-72 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map View Would Appear Here</p>
                </div>
              </div>
            </div>
            
            {/* Booking Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CalendarCheck className="h-5 w-5 mr-2 text-blue-500" />
                  Book This Space
                </h2>
                
                {error && (
                  <div className="bg-error-50 text-error-700 p-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}
                
                {!parking.isAvailable ? (
                  <div className="bg-amber-50 text-amber-800 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      <p className="font-medium">Currently Booked</p>
                    </div>
                    <p className="mt-2 text-sm">
                      This parking space is currently booked. Please check back later or search for other available spaces.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="datetime-local"
                        id="startTime"
                        className="input-field"
                        required
                        value={bookingStartTime}
                        onChange={(e) => setBookingStartTime(e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="datetime-local"
                        id="endTime"
                        className="input-field"
                        required
                        value={bookingEndTime}
                        onChange={(e) => setBookingEndTime(e.target.value)}
                        min={bookingStartTime}
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Price per hour</span>
                        <span className="font-medium">${parking.price.toFixed(2)}</span>
                      </div>
                      
                      {bookingStartTime && bookingEndTime && (
                        <>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-medium">
                              {(() => {
                                const start = new Date(bookingStartTime);
                                const end = new Date(bookingEndTime);
                                const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                                return durationHours > 0 ? `${durationHours.toFixed(1)} hours` : '-';
                              })()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>
                              {(() => {
                                const start = new Date(bookingStartTime);
                                const end = new Date(bookingEndTime);
                                const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                                return durationHours > 0 ? `$${(durationHours * parking.price).toFixed(2)}` : '-';
                              })()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full py-3"
                      disabled={loading || !bookingStartTime || !bookingEndTime || !isAuthenticated}
                    >
                      {loading ? 'Processing...' : 'Book Now'}
                    </button>
                    
                    {!isAuthenticated && (
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Please <a href="/login" className="text-blue-600 hover:underline">log in</a> to book this space
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetailPage;