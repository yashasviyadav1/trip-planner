import React from 'react';
import './navbar.css';
import logo from './Logo.png';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <h1>
          <img src={logo} alt='Logo' height='50' width='150' />
        </h1>
      </div>
      <div className='nav-right'>
        <ul>
          <li>
            <Link className="navbar-links" to='/'>Home</Link>
          </li>
          <li>
            <Link className="navbar-links" to='/upcoming-trips'>Upcoming Trips</Link>
          </li>
          <li>
          <Link className="navbar-links" to='/completed-trips'>Completed Trips</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;