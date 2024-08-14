import React, { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

import { GrUserAdmin } from "react-icons/gr";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const LoginForm = () => {
  const navigate =useNavigate('');
  const [userId, setUserId] = useState("");
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const adminUserId = "admin123"; // Admin User ID

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === adminUserId) {
      setIsLoggedIn(true);
      navigate('/admin-panel')

    } else {
      toast("Invalid User ID or Password");
    }
  };

  if (isLoggedIn) {
    return <div className="admin-panel">Welcome to the Admin Panel!</div>;
  }

  return (
    <div className="login-form-container1">
       <ToastContainer />
      <form onSubmit={handleLogin} className="login-form1">
        <h2>Login</h2>
        <div className="input-group1">
          <label htmlFor="userId">< GrUserAdmin size={30} color="#E1306C" /></label>
          <input
            type="text"
            id="userId"
            placeholder="UserId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        
        <button type="submit" className="login-button1">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
