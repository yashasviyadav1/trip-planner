import React from 'react';
import './navbar.css';
import logo from './Logo.png';

function NavBar(){
    return (
        <nav className = "navbar">
            <div className='nav-left'>
                <h1><img src = {logo} alt = "Logo" height="50" width="150"></img></h1>
            </div>
            <div className='nav-right'>
                <ul>
                <li><a href = "#">Pending Trips</a></li>
                <li><a href = "#">Upcoming Trips</a></li>
                <li><a href = "#">Completed Trips</a></li>
                </ul>
            </div>
        </nav>

    );
}
export default NavBar;