import React, { lazy, Suspense, memo } from 'react';
import { useSelector } from 'react-redux';
import Routes from '../routes';

const DashLayout = lazy(() => import('../layout/dash'));
const AuthLayout = lazy(() => import('../layout/auth'));

const Layouts = () => {
    const authentiqueState = useSelector((state) => state.user);
    const jwtToken = authentiqueState ? authentiqueState.jwtToken : null;
    const blankLayout = useSelector((state) => state.sidebar.blankLayout);

    const Layout = jwtToken && !blankLayout ? DashLayout : AuthLayout;

    return (
        <Suspense fallback={<div>Loading layout...</div>}>
            <Layout>
                <Routes />
            </Layout>
        </Suspense>
    );
};

export default memo(Layouts);
