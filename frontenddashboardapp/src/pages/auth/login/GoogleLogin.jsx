/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './google.css'

function  ContinueWithGoogle({ isOpen, onClose}) {
  if (!isOpen) return null;



  const continuer = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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
        console.log(userInfoRes);

        if (userInfoRes && userInfoRes.data) {
          localStorage.setItem('user_info', JSON.stringify(userInfoRes.data))
        }
        

        onClose()
        window.location.reload()
  
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    },
    onError: () => {
      console.log('Erreur lors de la connexion avec Google');
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
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Services Google</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
      </div>
      <div className="space-y-4">
        <p><strong>Vous devez accepter les conditions d'utilisation des service google avant acceder a ce service
          
          </strong> </p>
        
      </div>
      <div className="mt-6 text-right">
        <button
        onClick={() => continuer()}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Accepter
        </button>
      </div>
      </div>
      </div>

    </>
    
  );
}

export default ContinueWithGoogle;
