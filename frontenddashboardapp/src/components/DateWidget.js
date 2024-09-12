import React, { useState, useEffect } from 'react';

const DateComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
     // Met à jour chaque seconde

    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(timerId);
  }, []);

  // Formater la date
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR');
  };

  return (
    <div className='w-1/2 mt-20 ml-5 border border-gray-500 first-letter  shadow-lg shadow-cyan-500/50' >
      <h2>Date actuelle : {formatDate(currentDate)}</h2>
      <h3>Heure actuelle : {formatTime(currentDate)}</h3>
    </div>
  );
};

export default DateComponent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DataFromAPI = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fonction pour récupérer les données depuis l'API
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Benin&appid=2950bee37da9701ae7d405d5da459928`);
//       setData(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Erreur lors de la récupération des données.");
//       setLoading(false);
//     }
//   };

//   // Utilisation de useEffect pour charger les données à l'initialisation
//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) return <p>Chargement...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="w-full p-6 mt-10">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Posts Récupérés depuis l'API</h2>
//       {/* <ul>
//         {data.slice(0, 10).map((post) => (
//           <li key={post.id} className="mb-4 p-4 border border-gray-300 rounded shadow">
//             <h3 className="font-semibold text-lg">{post.title}</h3>
//             <p>{post.body}</p>
//           </li>
//         ))}
//       </ul> */}

// <ul>
//       {data.slice(0, 10).map((post) => (
//         <li key={post.id} className="mb-4 p-4 border border-gray-300 rounded shadow">
//           <h3 className="font-semibold text-lg">{post.title}</h3>
//           <p>{post.body}</p>
//         </li>
//       ))}
//     </ul>
//     </div>
//   );
// };

// export default DataFromAPI;


