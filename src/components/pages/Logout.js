import React, {useState, useEffect } from 'react';
import { useAuthContext } from '../../store/context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const { token,updateToken } = useAuthContext();
    useEffect(() => {
        if (token) {
            updateToken();
      
          navigate('/login');
        }}, [token]);
  return (
    <div>



    </div>
  )
}

export default Logout