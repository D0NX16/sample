import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ParkingListPage from './pages/ParkingListPage';
import ParkingDetailPage from './pages/ParkingDetailPage';
import AddParkingPage from './pages/AddParkingPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="parking/:id" element={<ParkingDetailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="add-parking" element={<AddParkingPage />} />
          <Route path="my-listings" element={<ParkingListPage />} />
          <Route path="my-bookings" element={<BookingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;