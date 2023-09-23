import React, { useEffect } from 'react';
import Navbar from '../navigation/Navigation';
import { useAuthContext } from '../../store/context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("I don't have a token");
      navigate('/login');
    }}, [token]);

  // If there's no token, return null to prevent rendering other components
  // if (!token) {
  //   return null;
  // }

  return (
    <div>
      <Navbar />
      <main><Outlet/></main>
    </div>
  );
}

export default Layout;
