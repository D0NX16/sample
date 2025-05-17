import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import type { ParkingSpace } from '../../contexts/ParkingContext';

interface ParkingCardProps {
  parking: ParkingSpace;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ parking }) => {
  return (
    <div className="card overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="relative h-48">
        <img 
          src={parking.images[0] || 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg'} 
          alt={parking.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`badge ${parking.isAvailable ? 'badge-available' : 'badge-booked'}`}>
            {parking.isAvailable ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{parking.name}</h3>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{parking.address}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{parking.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-blue-600">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold">${parking.price}/hour</span>
          </div>
          
          <Link 
            to={`/parking/${parking.id}`}
            className="text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;