import React, { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import type { ParkingSpace } from '../../contexts/ParkingContext';

interface MapViewProps {
  parkingSpaces: ParkingSpace[];
  onParkingSelect?: (parkingId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ parkingSpaces, onParkingSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // In a real implementation, we would use a library like react-map-gl or Google Maps API
  // For this demo, we'll create a simple mock map with pins
  
  const handlePinClick = (parkingId: string) => {
    setSelectedMarker(parkingId);
    if (onParkingSelect) {
      onParkingSelect(parkingId);
    }
  };
  
  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden h-full min-h-96">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
      
      {/* Mock Map UI */}
      <div className="relative h-full w-full">
        {/* Grid lines to simulate a map */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array(64).fill(0).map((_, i) => (
            <div key={i} className="border border-gray-200 opacity-30"></div>
          ))}
        </div>
        
        {/* Mock roads */}
        <div className="absolute top-1/4 left-0 right-0 h-4 bg-gray-300 opacity-60"></div>
        <div className="absolute top-3/4 left-0 right-0 h-4 bg-gray-300 opacity-60"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-4 bg-gray-300 opacity-60"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-4 bg-gray-300 opacity-60"></div>
        
        {/* Parking markers */}
        {parkingSpaces.map((parking, index) => {
          // Calculate position based on index to spread markers around
          const left = 15 + ((index * 123) % 70);
          const top = 20 + ((index * 87) % 60);
          
          return (
            <div 
              key={parking.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                selectedMarker === parking.id ? 'z-10 scale-125' : 'z-0 hover:scale-110'
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => handlePinClick(parking.id)}
            >
              <div className="flex flex-col items-center">
                <MapPin 
                  className={`h-8 w-8 ${
                    selectedMarker === parking.id 
                      ? 'text-blue-600 fill-blue-200' 
                      : 'text-blue-500 hover:text-blue-600'
                  }`} 
                />
                {selectedMarker === parking.id && (
                  <div className="absolute -bottom-16 bg-white p-2 rounded-lg shadow-lg text-xs w-32 text-center">
                    <p className="font-medium text-gray-800">{parking.name}</p>
                    <p className="text-blue-600">${parking.price}/hr</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white bg-opacity-70 px-2 py-1 rounded">
        Map data would appear here in a real implementation
      </div>
    </div>
  );
};

export default MapView;