import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useParking } from '../contexts/ParkingContext';
import { Plus, Car } from 'lucide-react';
import ParkingCard from '../components/parking/ParkingCard';

const ParkingListPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserParkingSpaces, parkingSpaces } = useParking();
  
  const myParkingSpaces = user ? getUserParkingSpaces(user.id) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Parking Spaces</h1>
          <Link to="/add-parking" className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Space</span>
          </Link>
        </div>
        
        {myParkingSpaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myParkingSpaces.map(space => (
              <ParkingCard key={space.id} parking={space} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Parking Spaces Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't listed any parking spaces yet. Start sharing your unused parking space and earn extra income.
            </p>
            <Link 
              to="/add-parking" 
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Space</span>
            </Link>
          </div>
        )}
        
        {/* Sample Parking Spaces (in case user has no spaces in demo) */}
        {myParkingSpaces.length === 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Sample Parking Spaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parkingSpaces.slice(0, 3).map(space => (
                <div key={space.id} className="relative">
                  <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white py-1 px-3 text-sm font-medium text-center">
                    Sample Listing
                  </div>
                  <ParkingCard parking={space} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingListPage;