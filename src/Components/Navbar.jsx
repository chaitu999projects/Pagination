import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='fixed p-2 w-full bg-amber-200 text-2xl font-bold z-10'>
      <ul className='flex flex-row justify-between p-3' >
        <div><li><Link to='/'>Chaitanya</Link></li></div>
        <div className='flex '>
        <li className='mx-2'><Link to="/">Some</Link></li>
        <li className='mx-2'><Link to="/more">More</Link></li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
