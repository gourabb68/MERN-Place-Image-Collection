import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/auth-context'
import './NavLink.css';

const Navlinks =props =>{
    const auth =useContext(AuthContext);
// const routePlace=`/${auth.userId}/places`;
    // const auth = useContext(AuthContext)

    return (
        <ul className="nav-links">
           <li>
               <NavLink to='/' exact>ALL USERS</NavLink>
           </li>
           <li>
               {auth.isLoggedIn && 
               <NavLink to={'/'+auth.userId+'/places'}>MY PLACES</NavLink>}
           </li>
           <li>
           {auth.isLoggedIn && 
               <NavLink to='/place/new'>ADD PLACES</NavLink>}
           </li>
           <li>
           {!auth.isLoggedIn && 
               <NavLink to='/auth'>AUTHENTICATE</NavLink>}
           </li>
           {auth.isLoggedIn && <button onClick={auth.logout}> LOGOUT</button>}
        </ul>
    )
}

export default Navlinks;