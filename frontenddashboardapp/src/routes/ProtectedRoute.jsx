import React, {useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_PREFIX_PATH, UNAUTHENTICATED_ENTRY, REDIRECT_URL_KEY } from '../configs/AppConfig';

const ProtectedRoute = ({ allowedRoles }) => {

	const dispatch = useDispatch();


    const { isLoggedIn, jwtToken, connecte, userRloes } = useSelector(state => state.user) || {};
  
	
    const location = useLocation();
	if (jwtToken && (connecte || isLoggedIn)) {
		
		// if(userRloes){
		// 	if (allowedRoles && !allowedRoles.includes(userRloes)) {
				
		// 		return <Navigate to={`${AUTH_PREFIX_PATH}/error-page`} replace />;
		// 	}
		// }
	
	
		return <Outlet />;
	}

	return <Navigate to={`${AUTH_PREFIX_PATH}${UNAUTHENTICATED_ENTRY}?${REDIRECT_URL_KEY}=${location.pathname}`} replace />;
	
};

export default ProtectedRoute