import React, { useState, useEffect } from 'react';
import { iconsImgs } from "../../utils/images";
import "./Cards.css";

const Cards = () => {


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
    <div className="grid-one-item grid-common grid-c1">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Date :</h3>
            <h3 className="grid-c-title-text">{formatDate(currentDate)}</h3>
        </div>

        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Heure :</h3>
            <h3 className="grid-c-title-text">{formatTime(currentDate)}</h3>
            
        </div>
        
        <div className="grid-c1-content">
            <p>Balance</p>
            <div className="lg-value">$ 22,000</div>
            <div className="card-wrapper">
                <span className="card-pin-hidden">**** **** **** </span>
                <span>1234</span>
            </div>
            <div className="card-logo-wrapper">
                <div>
                    <p className="text text-silver-v1 expiry-text">Expires</p>
                    <p className="text text-sm text-white">12/22</p>
                </div>
                <div className="card-logo">
                    <div className="logo-shape1"></div>
                    <div className="logo-shape2"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cards
