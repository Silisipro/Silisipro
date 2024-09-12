import { useSelector } from 'react-redux';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../configs/NavigationConfig';
import { Link } from 'react-router-dom'; // Importez Link
import "./Sidebar.css";

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'sidebar-change' : ''}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile image" />
        </div>
        <span className="info-name">alice-doe</span>
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
    </div>
  );
};

export default Sidebar;
