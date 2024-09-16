import React, { useState, useEffect } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { login, registerGoogle, getService  } from '../store/auth/user';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
 
  const authentiqueState = useSelector((state) => state.user);
  const jwtToken = authentiqueState ? authentiqueState.jwtToken : null;


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
  
    if (!formData.email || formData.email.trim() === "") {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      formErrors.email = "Email is invalid";
    }
      if (!formData.password || formData.password.trim() === "") {
      formErrors.password = "Password is required";
    }
  
    return formErrors;
  };

  const handleSubmit = (e) => {
    localStorage.clear()
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      dispatch(login(formData)).then((result) => {
        if(result.payload.status_code === 200) {
          dispatch(getService())
          navigate('/dashboard')
          window.location.reload()
        }
      })
        .catch((err) => {
          setErrors({ submit: err.message });
        });
    } else {
      setErrors(formErrors);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      localStorage.clear()
      const accessToken = tokenResponse.access_token;
      localStorage.setItem('token_access_google', accessToken);
      
      try {
    
        const userInfoRes = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/json',
            },
          }
        );
  
        if (userInfoRes && userInfoRes.data) {
          dispatch(registerGoogle(userInfoRes.data));
          dispatch(getService())
          navigate('/dashboard');
        } else {
          console.error("Les données utilisateur ne sont pas disponibles");
        }        
        setUserInfo(userInfoRes.data);
        const information = userInfoRes.data;
        localStorage.setItem('user_info', JSON.stringify(information))
  
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        setError('Erreur lors de la récupération des données');
      }
    },
    onError: () => {
      console.log('Erreur lors de la connexion avec Google');
      setError('Erreur lors de la connexion avec Google');
    },
    scope: [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/youtube',
      
    ].join(' '),
    prompt: 'consent',
  
  });


  return (
    <>
       {!jwtToken && (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <Link to="/" className="text-2xl font-bold text-center mb-6">
      <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
        </Link>
       
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="you@example.com"
       
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="••••••••"
        
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
          {errors.submit && <p className="text-red-500 text-sm text-center mt-4">{errors.submit}</p>}
        </form>


        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-100 text-black py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm">
            You do not have an account? <Link to="/auth/register" className="text-indigo-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
    )}
    </>
   
  );
};

export default LoginForm;
