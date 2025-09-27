import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { userData } = useContext(AuthContext);

  // agar token hai to andar ke nested routes render kar do
  if (userData?.token) {
    return <Outlet />;
  }

  // warna login page par bhej do
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
