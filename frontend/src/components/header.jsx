import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

function Header() {
  return (
    <header>
      <nav className='navBar'>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="links-header">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            {/* <li><Link to="/admin">Admin-Dashboard</Link></li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

