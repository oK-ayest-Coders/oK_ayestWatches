import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">

        <div className="navbarLeft">
          <li><Link to="/watches" className="navbar-link">Home</Link></li>
          <li><Link to="/login" className="navbar-link">Login</Link></li>
          <li><Link to="/signUp" className="navbar-link">Sign up</Link></li>
        </div>
        <div className="navbarRight">
          <li><Link to="/ShoppingCart" className="navbar-link">Cart</Link></li>
        </div>

      </ul>
    </nav>
  );
}

export default Navbar;
