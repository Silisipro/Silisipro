import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Bouton Home */}
        <a href="/" className="text-white text-lg font-semibold">
          Home
        </a>
        
        {/* Boutons Sign Up et Sign In */}
        <div className="space-x-4">
          <a href="#" className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
            Sign Up
          </a>
          <a href="#" className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




// import React from 'react';
// // import './Navbar.css'; // Assure-toi que tu as un fichier CSS pour le style

// const Navbar = () => {
//   return (
//     <nav className="navbar flex flex-row bg-violet-200 border bottom-2 gap-6 resize rounded-md ">
//       <div className="navbar-logo">
//         <a href="/">HOME</a>
//       </div>
//       <ul className="navbar-links flex flex-row gap-8 text-right shadow-lg shadow-cyan-500/50 ">
//         <li><a href="#home">Accueil</a></li>
//         <li><a href="#movies">Signup</a></li>
//         <li><a href="#new-releases">Signin</a></li>
//         <li><a href="#about">À propos</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

