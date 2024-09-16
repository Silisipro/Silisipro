import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../configs/NavigationConfig';
import { useLocation , useNavigate } from 'react-router-dom'; 
import "./Sidebar.css";
import { logout  } from '../../store/auth/user';
import { useDispatch } from 'react-redux';
import  ContinueWithGoogle from '../../pages/auth/login/GoogleLogin'




const Sidebar = () => {



  const [isModalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [activeNavigationLinks, setActiveNavigationLinks] = useState([]);

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 


  const { services, isAdmin, jwtTokenGoogle} = useSelector((state) => state.user);


  useEffect(() => {
 
    if (services && services.length > 0) {
      const activeNs = isAdmin == true
        ? navigationLinks
        : navigationLinks.filter((navigationLink) =>
            services.some((service) => {
              
              return (
                service.service.toLowerCase().replace(/\s/g, '') ===
                navigationLink.name.toLowerCase().replace(/\s/g, '')
              );
            })
          );
  
      setActiveNavigationLinks(activeNs);
    }
  }, [isAdmin, services]);
   


  const consentShow = () => {
    setModalOpen(true);
  };

  const closeConsent = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout()).then((result) => {
      if(result.payload.status_code) {
        navigate('/auth/login')
        window.location.reload()
      }
    });
  }
  

      const consentir = (path) => {
     
        if (jwtTokenGoogle == null) {
          if (path==='/dashboard' || path==='/dashboard/dashboard/weather' || path==='/dashboard/dashboard/user' ) {
            navigate(path);

            return
          }
          consentShow()
        } else {
          navigate(path);
        }
      };


      useEffect(() => {

        const userLogger = localStorage.getItem('userLogger') || localStorage.getItem('user_info')
    
        if (userLogger) {
          try {
          
            const parsedUserInfos = JSON.parse(userLogger);
            setUserInfo(parsedUserInfos); 
          } catch (error) {
            console.error("Error");
          }
        } else {
          console.log("no data");
        }
      }, [])

  return (
    <>
      <ContinueWithGoogle isOpen={isModalOpen} onClose={closeConsent} />
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-change' : ''}`}>
        <div className="user-info">
          <div className="info-img img-fit-cover">
            <img src={personsImgs.person_two} alt="profile image" />
          </div>
          { userInfo && (
            <span className="info-name">{userInfo.name.substring(0,8)}...</span>
          )
          
          }
        </div>

        <nav className="navigation">
          <ul className="nav-list">
            {activeNavigationLinks.map((navigationLink) => (
              <li className="nav-item" key={navigationLink.id}>
                <div
                  onClick={() => consentir(navigationLink.path)}
                  className={`nav-link ${location.pathname === navigationLink.path ? 'active' : ''}`}

                >
                  <img
                    src={navigationLink.image}
                    className="nav-link-icon"
                    alt={navigationLink.title}
                  />
                  <span className="nav-link-text">{navigationLink.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold py-2 px-12 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>

    </>
  );
};

export default Sidebar;
