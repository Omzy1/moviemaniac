import React from 'react'
import Fire from '../../assets/fire.png';
import Star from '../../assets/glowing-star.png';
import Party from '../../assets/partying-face.png';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navBar'>
        <h1>MovieMiniac</h1>

        <div className="nav_links">
            <NavLink to="/">Popular <img src={Fire} alt="fire icon"
             className='navbar_emoji' /></NavLink>
               <NavLink to="/top_rated">Top Rated <img src={Star} alt="Start icon"
             className='navbar_emoji' /></NavLink>
               <NavLink to="/upcoming">Latest <img src={Party} alt="Party icon"
             className='navbar_emoji' /></NavLink>
        </div>
    </nav>
  )
};

export default Navbar