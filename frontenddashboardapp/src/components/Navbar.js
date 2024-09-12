import React from 'react';
// import './Navbar.css'; // Assure-toi que tu as un fichier CSS pour le style

const Navbar = () => {
  return (
    <nav className="navbar flex flex-row bg-violet-200 border bottom-2 gap-6 resize rounded-md ">
      <div className="navbar-logo">
        <a href="/">HOME</a>
      </div>
      <ul className="navbar-links flex flex-row gap-8 text-right shadow-lg shadow-cyan-500/50 ">
        <li><a href="#home">Accueil</a></li>
        <li><a href="#movies">Signup</a></li>
        <li><a href="#new-releases">Signin</a></li>
        <li><a href="#about">À propos</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;