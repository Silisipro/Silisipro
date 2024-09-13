import React, { useState, useEffect } from 'react';

const DateComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
     

  
    return () => clearInterval(timerId);
  }, []);

 
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR');
  };

  return (
    <div className='w-full sm:w-1/2 mt-10 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6'>
    <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
      Date actuelle : <span className='font-normal text-gray-600'>{formatDate(currentDate)}</span>
    </h2>
    <h3 className='text-xl font-medium text-gray-700'>
      Heure actuelle : <span className='font-normal text-gray-500'>{formatTime(currentDate)}</span>
    </h3>
  </div>
  
  );
};

export default DateComponent;


