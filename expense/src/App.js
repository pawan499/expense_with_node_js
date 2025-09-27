import React, { useEffect, useState } from 'react'
import { AuthContext } from './app/context/AuthContext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DashboardLayout from './app/layouts/DashboardLayout';
import LoginPage from './app/pages/auth/login/Login'
import Register from './app/pages/auth/register/Register'
import ProtectedRoute from './app/routes/ProtectedRoute'
import PublicRoute from './app/routes/PublicRoute'
import { routes } from './app/routes/routes';
const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("Auth");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Routes>
        
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            {
            routes.map((route)=>route.protected && <Route
              path={route.path}
              element={<DashboardLayout children={route.element} />}
            /> )
          }
           
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default App;
