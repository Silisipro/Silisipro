import Navbar from './components/Navbar';
import WeatherWidget from './components/WeatherWidget';
import DateWidget from './components/DateWidget';
import Layouts from './layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
    return (

            <div className="app">
              <Layouts />
            </div>
     
    )
  }

