import Navbar from './components/Navbar';
import WeatherWidget from './components/WeatherWidget';
import DateWidget from './components/DateWidget';


export default function App() {
    return (
      <h1 className="text-3xl font-bold underline ">
            <Navbar/>
            <WeatherWidget/>
            <DateWidget/>
            
      </h1>
    )
  }
// import Registerform from './components/Registerform';
// import Taux_Conversion from './Services/Exchanges/Taux_Conversion'


//  const App = () => {
//    return (
//      <div className="container mx-auto p-4">
//        <h1 className="text-2xl font-bold mb-4 text-center text-gray-950">Inscription</h1>
//        <Registerform />
//      </div>
//    );
//  };

//  export default App;


//import ExchangeRateWidget from './components/ExchangeRateWidget';
// import NasaNeoWidget from "./Services/Astronomie/Asteroides";
//import SpaceXLaunches from "./Services/Astronomie/Spacex";
//import CurrencyWidget from "./Services/Exchanges/MoneyCode";
//import IntradayStockWidget from "./Services/Exchanges/BourseMarket";
//import FavoriteTeamWidget from "./components/FavoriteTamWidget";

// const App = () => {
//   return (
//     <div className="App min-h-screen bg-gray-100 p-6 flex items-center justify-center">
//       {/* <ExchangeRateWidget />  */}
//         {/* <NasaNeoWidget/>   */}
//       {/* <SpaceXLaunches/> */}
//        {/* <CurrencyWidget/>  */}
//        {/* <FavoriteTeamWidget/> */}
//        {/* <IntradayStockWidget/>  */}
//     </div>
//   );
// };

// export default App;
