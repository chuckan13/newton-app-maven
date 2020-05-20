import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/howitworks">How it works</NavLink>
       </div>
    );
}
 
export default Navigation;