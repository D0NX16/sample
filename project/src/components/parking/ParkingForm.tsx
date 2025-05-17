import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useParking } from '../../contexts/ParkingContext';
import { MapPin, Image } from 'lucide-react';

const ParkingForm: React.FC = () => {
  const { user } = useAuth();
  const { addParkingSpace } = useParking();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    contactInfo: '',
    price: 0,
    location: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    images: ['https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg']
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFormData({
      ...formData,
      price: isNaN(value) ? 0 : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate form
      if (!formData.name || !formData.address || !formData.description || !formData.contactInfo) {
        throw new Error('Please fill in all required fields.');
      }
      
      if (formData.price <= 0) {
        throw new Error('Price must be greater than 0.');
      }
      
      // In a real app, we would probably geocode the address here to get lat/lng
      
      // Add the new parking space
      if (user) {
        await addParkingSpace({
          ...formData,
          ownerId: user.id,
          ownerName: user.name,
          isAvailable: true
        });
        
        navigate('/my-listings');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error-50 text-error-700 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Parking Space Name*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., Downtown Covered Parking"
          required
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address*
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., 123 Main St, City, State"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="input-field"
          placeholder="e.g., Covered parking spot for medium vehicles. Easy access from main road."
          required
        />
      </div>
      
      <div>
        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Information*
        </label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., Phone number or email"
          required
        />
      </div>
      
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Hourly Rate (in $)*
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price || ''}
          onChange={handlePriceChange}
          className="input-field"
          placeholder="e.g., 5"
          min="0"
          step="0.5"
          required
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <p className="font-medium">Location on Map</p>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          In this demo, we're using default coordinates. In a real application, you'd be able to
          place a pin on a map or we'd geocode your address.
        </p>
        <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Map Preview Would Appear Here</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <Image className="h-5 w-5 text-blue-500" />
          <p className="font-medium">Photos</p>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          In this demo, we're using a default image. In a real application, you'd be able to
          upload your own photos.
        </p>
        <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Image Upload Would Appear Here</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary w-full md:w-auto"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
      </div>
    </form>
  );
};

export default ParkingForm;