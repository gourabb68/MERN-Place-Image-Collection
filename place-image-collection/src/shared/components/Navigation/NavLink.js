import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavLink.css';

const Navlinks =props =>{

    return (
        <ul className="nav-links">
           <li>
               <NavLink to='/' exact>ALL USERS</NavLink>
           </li>
           <li>
               <NavLink to='/u1/places'>MY PLACES</NavLink>
           </li>
           <li>
               <NavLink to='/place/new'>ADD PLACES</NavLink>
           </li>
           <li>
               <NavLink to='/auth'>AUTHENTICATE</NavLink>
           </li>
        </ul>
    )
}

export default Navlinks;