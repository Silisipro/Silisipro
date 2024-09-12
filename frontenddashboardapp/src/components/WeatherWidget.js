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
    <div className="weather-widget p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Météo Actuelle</h2>
        <div className="flex mb-6">
          <input
            className="w-40 border-2 border-gray-300 rounded-l-md  text-gray-700 focus:outline-none focus:border-blue-500"
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Ville"
          />
          <button
            className="bg-blue-500 text-white border-2 border-blue-500 rounded-r-md py-2 ml-2 hover:bg-blue-700 hover:border-blue-700 transition-colors"
            onClick={() => fetchWeatherData(city)}
          >
            Rechercher
          </button>
        </div>
        <div className="flex">
          <div className="flex-1 mr-4">
            {weather ? (
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{weather.name}</h3>
                <p className="text-gray-600 mb-1">{weather.weather[0].description}</p>
                <p className="text-gray-700 mb-1">Température: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
                <p className="text-gray-700 mb-1">Humidité: {weather.main.humidity}%</p>
                <p className="text-gray-700">Vent: {weather.wind.speed} m/s</p>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p>Chargement...</p>
            )}
          </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
