import { iconsImgs } from "../../utils/images";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; 
import "./ContentTop.css";
import { toggleSidebar } from '../../store/sidebar/sidebarSlice'


const ContentTop = () => {

    const dispatch = useDispatch();
  return (
    <div className="main-content-top">
        <div className="content-top-left">
            <button type="button" className="sidebar-toggler"  onClick={() => dispatch(toggleSidebar())}>
                <img src={ iconsImgs.menu } alt="" />
            </button>
            <Link
                to='/' 
              > 
              
            <h3 className="content-top-title">Home</h3>
              </Link>
        </div>
        <div className="content-top-btns">
            <button type="button" className="search-btn content-top-btn">
                <img src={ iconsImgs.search } alt="" />
            </button>
            <button className="notification-btn content-top-btn">
                <img src={ iconsImgs.bell } />
                <span className="notification-btn-dot"></span>
            </button>
        </div>
    </div>
  )
}

export default ContentTop
