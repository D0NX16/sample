import React from 'react';
import ParkingForm from '../components/parking/ParkingForm';

const AddParkingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">List Your Parking Space</h1>
          <p className="text-gray-600 mb-8">
            Share your unused parking space and earn extra income
          </p>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ParkingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParkingPage;