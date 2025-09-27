import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { userData } = useContext(AuthContext);

  // Agar already login hai toh dashboard bhej do
  if (userData?.token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Nahi toh andar ke nested routes (login, register) render karo
  return <Outlet />;
};

export default PublicRoute;
