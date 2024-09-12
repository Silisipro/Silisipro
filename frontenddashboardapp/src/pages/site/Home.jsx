import React from 'react';
import Navbar from '../../components/Navbar'
import GoogleLogin from '../auth/login/GoogleLogin';
import Widget from '../../components/widget'
import DateWidget from '../../components/DateWidget'
import WeatherWidget from '../../components/WeatherWidget'
// import Sidebar from './layout/Sidebar/Sidebar';
// import Content from './layout/Content/Content';


function Home() {
  return (

    <div className="App">
      <div> <Navbar /> </div>
      <div className="flex space-x-4 mt-4">   
        <DateWidget />
        <WeatherWidget />
      </div> <br />
      <div className=''>  
        <Widget />
      </div>

    </div>

  );
}

export default Home;