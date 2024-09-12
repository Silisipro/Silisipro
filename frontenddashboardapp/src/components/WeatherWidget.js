import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Benin"); // Ville par défaut
  const [error, setError] = useState("");

//   const apiKey = '_API_KEY';

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2950bee37da9701ae7d405d5da459928`);
      setWeather(response.data);
      setError("");
    } catch (error) {
      setError("Ville non trouvée");
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="weather-widget">
      <h2>Météo Actuelle</h2>
      <div className="city-input">
        <input className='w-40 border-2 ml-4 mt-'
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="ville"
        />
        <button className='border-4 bg-violet-400 ml-5 shadow-md' onClick={() => fetchWeatherData(city)}>Rechercher</button>
      </div>

      {weather ? (
        <div className=" border-4 w-96 m-4 shadow-lg shadow-cyan-500/50 mt-10 ">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>Température: {(weather.main.temp-273.15).toFixed(2)}°C</p>
          <p>Humidité: {weather.main.humidity}%</p>
          <p>Vent: {weather.wind.speed} m/s</p>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
