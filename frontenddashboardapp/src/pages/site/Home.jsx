import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar'
import Widget from '../../components/widget'
import DateWidget from '../../components/DateWidget'


function Home() {


  const { isAdmin, isLoggedIn} = useSelector((state) => state.user);


  return (
    <div className="App">
      {!isLoggedIn && (
        <div> <Navbar /> </div>
      ) }
      <div>   
        <DateWidget />
      </div> <br />
      <div className=''>  
        <Widget />
      </div>

    </div>

  );
}

export default Home;