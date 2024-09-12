import React, { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import  VideoPlayer   from "./VideoPlayer";
import './google.css'

function GoogleLogin() {
  const [userInfo, setUserInfo] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [videoId, setVideoId] = useState('');

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;

      console.log(tokenResponse);
      localStorage.setItem('token', accessToken);
      
      

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
       
        
        setUserInfo(userInfoRes.data); 

        
        await listDriveFiles(accessToken);
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
     console.log('ok');
     
    }
  }, []);
  const listDriveFiles = async (accessToken) => {
    try {
      const driveResponse = await axios.get(
        'https://www.googleapis.com/drive/v3/files',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
          },
        }
      );
      console.log(driveResponse);
      
      setFiles(driveResponse.data.files); 
    } catch (error) {
      console.log('Erreur lors de la récupération des fichiers Drive', error);
      setError('Erreur lors de la récupération des fichiers Drive');
    }
  };


  const listDriverFiles = async () => {
    try {

      const token = localStorage.getItem('token');
      const driveResponse = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // params: {
          //   pageSize: 10,
          //   fields: 'nextPageToken, files(id, name)',
          // },
        }
      );
      console.log(driveResponse);
      
      // setFiles(driveResponse.data.files); 
    } catch (error) {
      console.log('Erreur lors de la récupération des fichiers Drive', error);
      setError('Erreur lors de la récupération des fichiers D');
    }
  };

  const listDriveprFiles = async () => {
    try {

      const token = localStorage.getItem('token');
      const driveResponse = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&myRating=like',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // params: {
          //   pageSize: 10,
          //   fields: 'nextPageToken, files(id, name)',
          // },
        }
      );
      console.log(driveResponse);
      
      // setFiles(driveResponse.data.files); 
    } catch (error) {
      console.log('Erreur lors de la récupération des fichiers Drive', error);
      setError('Erreur lors de la récupération des fichiers D');
    }
  };


  const videoyoutube = async () => {
    try {

      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            part: 'snippet,contentDetails',
            id: 'dQw4w9WgXcQ', // Remplacer par l'ID "dQw4w9WgXcQ" de la vidéo
            key: 'YOUR_API_KEY', // Clé API YouTube
          },
        }
      );
      console.log(response);
      setVideoId(response.data.items[0].id)

      console.log(response.data.items[0].snippet);
      
      // setFiles(driveResponse.data.files); 
    } catch (error) {
      console.log('Erreur lors de la récupération des fichiers Drive', error);
      setError('Erreur lors de la récupération des fichiers D');
    }
  };

 
  const logout = () => {
    googleLogout();
    setUserInfo(null);
    setFiles([]);
    setError(null);
  };

  return (
    <div className="App">
      {error && <p style={{ color: 'red' }}>{error}</p>} {}

      {userInfo ? (
        <div>
          <h3>Bienvenue, {userInfo.name}</h3>
          <img src={userInfo.picture} alt="Profil" />
          <p>Email info : {userInfo.email}</p>
          <button onClick={logout}>Se déconnecter</button>

          <h4 onClick={videoyoutube}>Fichiers Google Drive :</h4>
          <ul>
            {files.length > 0 ? (
              files.map((file) => (
                <li key={file.id}>
                  {file.name} (ID: {file.id})
                </li>
              ))
            ) : (
              <p>Aucun fichier trouvé.</p>
            )}
          </ul>

            {videoId && (
              <VideoPlayer
              videoId={videoId}
              />

  
            )}

        </div>
      ) : (
        <button onClick={() => login()}>Se connecter avec Google</button>
      )}
    </div>
  );
}

export default GoogleLogin;
