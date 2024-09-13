import React, { useEffect } from 'react';
import { onBlankLayout } from '../store/sidebar/sidebarSlice';
import { useDispatch } from 'react-redux';

const AppRoute = ({ component: Component, routeKey, blankLayout, ...props }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isBlank = !!blankLayout;
        dispatch(onBlankLayout(isBlank));
        console.log(isBlank);
        
    }, [blankLayout, dispatch]);

    return <Component {...props} />;
};

export default AppRoute;
