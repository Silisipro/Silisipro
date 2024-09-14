import React, { useState } from 'react';
import { activerService, getService, desactiverService } from '../store/auth/user';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';



import youtube from '../../src/assets/images/youtube.png'
import drive from '../../src/assets/images/drive.png'
import money from '../../src/assets/images/money.png'
import gmail from '../../src/assets/images/gmail.png'
import calendar from '../../src/assets/images/calendar.png'

const WidgetList = () => {

  const dispatch = useDispatch();

  const initialWidgets = [
    { id: 1, name: 'Youtube', logo: youtube },
    { id: 2, name: 'Drive', logo: drive },
    { id: 3, name: 'Exchange rate', logo: money },
    { id: 4, name: 'FavoriteTamWidget', logo: 'https://via.placeholder.com/50?text=F'},
    { id: 5, name: 'Calendar', logo: calendar},
    { id: 6, name: 'Mail', logo: gmail},
    { id: 7, name: 'Astronomie', logo: 'https://via.placeholder.com/50?text=A'},
    { id: 8, name: 'Space', logo: 'https://via.placeholder.com/50?text=S'}
  ];

  const { services, jwtToken, jwtTokenGoogle} = useSelector((state) => state.user);

  const handleCheckboxChange = (name) => {


    
    if (jwtToken ==null || !jwtTokenGoogle ==null) {
      
      toast.error("Veuillez vous connecter avant d'activer ce service" )
      return
    }

    
    const activeService = services?.find((service) => service.service === name);
    
    if (activeService) {
      dispatch(desactiverService(activeService.id));
    } else {
     
      dispatch(activerService(name));
    }
    dispatch(getService());
  };
  

  const isServiceActive = (name) => services?.some((service) => service.service === name);

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Liste des Widgets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {initialWidgets.map((widget) => (
          <div key={widget.id} className="flex flex-col items-center border border-gray-300 rounded-md p-4 bg-white shadow-md">
            <img
              src={widget.logo}
              alt={widget.name}
              className="w-16 h-16 mb-2"
            />
            <div className="flex items-center justify-between w-full mt-2">
              <button
              className={`py-1 px-4 rounded-md mr-2 ${isServiceActive(widget.name) ? 'bg-red-500' : 'bg-green-500'} text-white`}
                onClick={() => handleCheckboxChange(widget.name)}
              >
                {isServiceActive(widget.name) ? 'Désactiver' : 'Activer'}
              </button>
              <span className="text-lg font-bold text-gray-800 mt-4">
                {widget.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetList;
