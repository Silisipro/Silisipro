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