import React from 'react';
import WeatherWidget from '../../../components/WeatherWidget';
import DateWidget from '../../../components/DateWidget'




function Meteo() {
  return (

    <div className="App">
      <DateWidget />
      <WeatherWidget />
    </div>

  );
}

export default Meteo;