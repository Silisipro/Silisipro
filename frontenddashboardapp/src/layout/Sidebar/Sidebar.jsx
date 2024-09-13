import { useSelector } from 'react-redux';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../configs/NavigationConfig';
import { Link } from 'react-router-dom'; 
import "./Sidebar.css";
import { logout  } from '../../store/auth/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';




const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('logout')
    dispatch(logout()).then((result) => {
      if(result.payload.status_code) {
        navigate('/auth/login')
      }
    });
  }

  return (
    <div className={`sidebar ${isSidebarOpen ? 'sidebar-change' : ''}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile image" />
        </div>
        <span className="info-name">Sylvestre</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              <Link
                to={navigationLink.path} 
                className={`nav-link ${
                  navigationLink.id === 1 ? 'active' : ''
                }`}
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
        <button onClick={handleLogout}
          className="bg-red-500 text-white font-semibold py-2 px-12 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Logout
        </button> 
    </div>
  );
};

export default Sidebar;
