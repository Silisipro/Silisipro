import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai"; 
import { Link } from 'react-router-dom'
// Import de l'icône

const LoginForm = () => {
  const handleGoogleSignIn = () => {
    // Ici, vous pouvez intégrer l'authentification Google
    console.log("S'inscrire avec Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
        </form>


        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-100 text-black py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            <AiFillGoogleCircle className="w-6 h-6 mr-2" /> 
            Sign up with Google
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">
          You do not have an account ? <Link to="/register" className="text-indigo-600 hover:underline">sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
