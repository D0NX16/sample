import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface ParkingSpace {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  address: string;
  description: string;
  contactInfo: string;
  price: number;
  location: {
    latitude: number;
    longitude: number;
  };
  isAvailable: boolean;
  images: string[];
  createdAt: string;
}

export interface Booking {
  id: string;
  parkingId: string;
  parkingName: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}

interface ParkingContextType {
  parkingSpaces: ParkingSpace[];
  bookings: Booking[];
  addParkingSpace: (space: Omit<ParkingSpace, 'id' | 'createdAt'>) => void;
  updateParkingSpace: (id: string, space: Partial<ParkingSpace>) => void;
  deleteParkingSpace: (id: string) => void;
  getParkingSpaceById: (id: string) => ParkingSpace | undefined;
  searchParkingSpaces: (query: string) => ParkingSpace[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  getUserBookings: (userId: string) => Booking[];
  getUserParkingSpaces: (userId: string) => ParkingSpace[];
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

// Mock data
const mockParkingSpaces: ParkingSpace[] = [
  {
    id: '1',
    ownerId: '1',
    ownerName: 'John Smith',
    name: 'Downtown Parking Spot',
    address: '123 Main St, City Center',
    description: 'Covered parking spot for midsize vehicles in secured garage.',
    contactInfo: '555-123-4567',
    price: 8,
    location: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    isAvailable: true,
    images: [
      'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg',
      'https://images.pexels.com/photos/375893/pexels-photo-375893.jpeg'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    ownerId: '2',
    ownerName: 'Sarah Johnson',
    name: 'Residential Driveway',
    address: '456 Oak Ave, Suburbia',
    description: 'Private driveway with space for a large SUV or truck.',
    contactInfo: '555-987-6543',
    price: 5,
    location: {
      latitude: 37.7833,
      longitude: -122.4167
    },
    isAvailable: true,
    images: [
      'https://images.pexels.com/photos/1054114/pexels-photo-1054114.jpeg'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    ownerId: '3',
    ownerName: 'Michael Chen',
    name: 'Shopping Center Spot',
    address: '789 Market St, Shopping District',
    description: 'Convenient parking near major retailers and restaurants.',
    contactInfo: '555-456-7890',
    price: 10,
    location: {
      latitude: 37.7903,
      longitude: -122.4063
    },
    isAvailable: true,
    images: [
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    ownerId: '4',
    ownerName: 'Aswin',
    name: 'SRM IST',
    address: 'srm nagar, potheri, kattankulathur.kancheepuram-dist',
    description: 'Convenient parking near major retailers and restaurants.',
    contactInfo: '6374654808',
    price: 15,
    location: {
      latitude: 12.9853,
      longitude: 79.9698
    },
    isAvailable: true,
    images: [
      'https://mdmsenquiry.com/wp-content/uploads/2017/09/srm-university.jpg'
    ],
    createdAt: new Date().toISOString()
  },

];

const mockBookings: Booking[] = [
  {
    id: '1',
    parkingId: '1',
    parkingName: 'Downtown Parking Spot',
    userId: '2',
    userName: 'Sarah Johnson',
    startTime: new Date(Date.now() + 86400000).toISOString(), // tomorrow
    endTime: new Date(Date.now() + 90000000).toISOString(),
    status: 'confirmed',
    totalAmount: 16,
    createdAt: new Date().toISOString()
  }
];

export function ParkingProvider({ children }: { children: ReactNode }) {
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>(mockParkingSpaces);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedParkingSpaces = localStorage.getItem('parkingSpaces');
    const storedBookings = localStorage.getItem('bookings');

    if (storedParkingSpaces) {
      setParkingSpaces(JSON.parse(storedParkingSpaces));
    } else {
      localStorage.setItem('parkingSpaces', JSON.stringify(mockParkingSpaces));
    }

    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      localStorage.setItem('bookings', JSON.stringify(mockBookings));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('parkingSpaces', JSON.stringify(parkingSpaces));
  }, [parkingSpaces]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addParkingSpace = (space: Omit<ParkingSpace, 'id' | 'createdAt'>) => {
    const newSpace: ParkingSpace = {
      ...space,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setParkingSpaces([...parkingSpaces, newSpace]);
  };

  const updateParkingSpace = (id: string, space: Partial<ParkingSpace>) => {
    setParkingSpaces(
      parkingSpaces.map((ps) => (ps.id === id ? { ...ps, ...space } : ps))
    );
  };

  const deleteParkingSpace = (id: string) => {
    setParkingSpaces(parkingSpaces.filter((ps) => ps.id !== id));
  };

  const getParkingSpaceById = (id: string) => {
    return parkingSpaces.find((ps) => ps.id === id);
  };

  const searchParkingSpaces = (query: string) => {
    if (!query) return parkingSpaces.filter(ps => ps.isAvailable);

    const lowerCaseQuery = query.toLowerCase();
    return parkingSpaces.filter(
      (ps) =>
        ps.isAvailable &&
        (ps.name.toLowerCase().includes(lowerCaseQuery) ||
          ps.address.toLowerCase().includes(lowerCaseQuery) ||
          ps.description.toLowerCase().includes(lowerCaseQuery))
    );
  };

  const createBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);

    // Update parking space availability
    updateParkingSpace(booking.parkingId, { isAvailable: false });
  };

  const updateBooking = (id: string, booking: Partial<Booking>) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, ...booking } : b)));

    // If booking is cancelled, make the parking space available again
    if (booking.status === 'cancelled') {
      const bookingToUpdate = bookings.find(b => b.id === id);
      if (bookingToUpdate) {
        updateParkingSpace(bookingToUpdate.parkingId, { isAvailable: true });
      }
    }
  };

  const getUserBookings = (userId: string) => {
    return bookings.filter((b) => b.userId === userId);
  };

  const getUserParkingSpaces = (userId: string) => {
    return parkingSpaces.filter((ps) => ps.ownerId === userId);
  };

  const value = {
    parkingSpaces,
    bookings,
    addParkingSpace,
    updateParkingSpace,
    deleteParkingSpace,
    getParkingSpaceById,
    searchParkingSpaces,
    createBooking,
    updateBooking,
    getUserBookings,
    getUserParkingSpaces
  };

  return <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>;
}

export function useParking() {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error('useParking must be used within a ParkingProvider');
  }
  return context;
}