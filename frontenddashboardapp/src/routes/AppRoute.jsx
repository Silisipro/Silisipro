import React, { useEffect } from 'react';
import { onBlankLayout } from '../store/sidebar/sidebarSlice';
import { getService  } from '../store/auth/user';
import { useDispatch } from 'react-redux';

const AppRoute = ({ component: Component, routeKey, blankLayout, ...props }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isBlank = !!blankLayout;
        dispatch(onBlankLayout(isBlank));
        dispatch(getService());
        
    }, [blankLayout, dispatch]);

    return <Component {...props} />;
};

export default AppRoute;
