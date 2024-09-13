import React, { useState } from 'react';
import youtube from '../../src/assets/images/youtube.png'
import google from '../../src/assets/images/google.png'
import drive from '../../src/assets/images/drive.png'
import money from '../../src/assets/images/money.png'
import gmail from '../../src/assets/images/gmail.png'
import calendar from '../../src/assets/images/calendar.png'
import translate from '../../src/assets/images/translate.png'

const WidgetList = () => {
  const initialWidgets = [
    { id: 1, name: 'Google', logo: google },
    { id: 2, name: 'Youtube', logo: youtube },
    { id: 3, name: 'Drive', logo: drive },
    { id: 4, name: 'Taux conversion', logo: money },
    { id: 5, name: 'FavoriteTamWidget', logo: 'https://via.placeholder.com/50?text=F'},
    { id: 6, name: 'Agenda', logo: calendar},
    { id: 7, name: 'Mail', logo: gmail},
    // { id: 8, name: 'Traduction', logo: translate}
  ];

  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedWidgets((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((widgetId) => widgetId !== id)
        : [...prevSelected, id]
    );
  };

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
                className="bg-green-500 text-white py-1 px-4 rounded-md mr-2"
                onClick={() => handleCheckboxChange(widget.id)}
              >
                {selectedWidgets.includes(widget.id) ? 'Désactiver' : 'Activer'}
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
