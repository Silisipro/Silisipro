import React from 'react';
import Navbar from '../../components/Navbar'
import GoogleLogin from '../auth/login/GoogleLogin';
// import Sidebar from './layout/Sidebar/Sidebar';
// import Content from './layout/Content/Content';


function Home() {
  return (

    <div className="App">
      {/* <h1>Authentification via Google</h1> */}
      <Navbar />
      {/* <GoogleLogin /> */}
      {/* <Sidebar />
      <Content /> */}
    </div>

  );
}

export default Home;