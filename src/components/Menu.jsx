import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Create a CSS file to style the menu

const Menu = () => {
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
          <Link to="/login" onClick={toggleMenu}>Login</Link>
          <Link to="/register" onClick={toggleMenu}>Register</Link>
          <Link to="/services" onClick={toggleMenu}>Services</Link>
          <Link to="/payment" onClick={toggleMenu}>Payment</Link>
        </nav>
      )}
    </div>
  );
};

export default Menu;
