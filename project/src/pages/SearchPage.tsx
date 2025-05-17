import React, { useState, useEffect } from 'react';
import { useParking } from '../contexts/ParkingContext';
import { Search, Filter, MapPin } from 'lucide-react';
import ParkingCard from '../components/parking/ParkingCard';
import MapView from '../components/search/MapView';

const SearchPage: React.FC = () => {
  const { parkingSpaces, searchParkingSpaces } = useParking();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSpaces, setFilteredSpaces] = useState(parkingSpaces.filter(ps => ps.isAvailable));
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Filter settings
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  
  // Update filtered spaces when search query changes
  useEffect(() => {
    const results = searchParkingSpaces(searchQuery);
    setFilteredSpaces(results);
  }, [searchQuery, searchParkingSpaces, parkingSpaces]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive via the useEffect
  };
  
  const applyFilters = () => {
    let results = searchParkingSpaces(searchQuery);
    
    // Apply price filter
    results = results.filter(space => 
      space.price >= priceRange[0] && space.price <= priceRange[1]
    );
    
    setFilteredSpaces(results);
    setIsFiltersOpen(false);
  };
  
  const resetFilters = () => {
    setPriceRange([0, 50]);
    const results = searchParkingSpaces(searchQuery);
    setFilteredSpaces(results);
    setIsFiltersOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, address, or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="btn-outline flex items-center space-x-2 py-3 px-4"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
                
                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2 py-3 px-6"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
            
            {/* Filter Panel */}
            {isFiltersOpen && (
              <div className="mt-4 p-4 border-t border-gray-200 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Price Range (per hour)</h3>
                    <div className="flex items-center space-x-4">
                      <span>${priceRange[0]}</span>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-grow"
                      />
                      <span>${priceRange[1]}</span>
                      <input
                        type="range"
                        min="0"
                        max="50" 
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button" 
                    onClick={resetFilters}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Reset Filters
                  </button>
                  
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {filteredSpaces.length} {filteredSpaces.length === 1 ? 'Parking Space' : 'Parking Spaces'} Found
          </h1>
          
          <div className="bg-white rounded-lg border border-gray-300 p-1 flex">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-1 rounded ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-1 rounded ${
                viewMode === 'map' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Map
            </button>
          </div>
        </div>
        
        {/* Results */}
        {viewMode === 'list' ? (
          <>
            {filteredSpaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpaces.map(space => (
                  <ParkingCard key={space.id} parking={space} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <p className="text-gray-600 mb-4">No parking spaces found matching your criteria.</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-4 h-[600px]">
            <MapView 
              parkingSpaces={filteredSpaces} 
              onParkingSelect={setSelectedSpaceId} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;