import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './Menu.css'

import Logout from './Logout';


const Menu = () => {
  
  
  const isAuthenticated = localStorage.getItem('authToken');
  const [isOpen, setIsOpen] = useState(false);
 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



 


  return (
    <div className="menu">

     
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>


      {isOpen && (
        <nav className="menu-links">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          {isAuthenticated ? <Logout/>:<Link to="/login" onClick={toggleMenu}>Login</Link>}
          <Link to="/register" onClick={toggleMenu}>Register</Link>
          <Link to="/services" onClick={toggleMenu}>Services</Link>
          <Link to="/payment" onClick={toggleMenu}>Payment</Link>
          <Link to="/admin" onClick={toggleMenu}>Admin panel</Link>

           
       
        </nav>
      )}
      {/* {inOpen && (
         <nav className="menu-links">
       <Link to="/notify" onClick={toggleOpen}></Link>
       </nav>
      )} */}


    </div>
  );
};

export default Menu;
