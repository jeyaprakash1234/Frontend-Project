import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token
    localStorage.removeItem('authToken');

    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
