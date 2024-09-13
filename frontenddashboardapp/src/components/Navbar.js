import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
  
        <a href="/" className="text-white text-lg font-semibold">
          Home
        </a>
        
       
        <div className="space-x-4">
          <Link to="/auth/register" className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
            Sign Up
          </Link>
          <Link to="/auth/login" className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


