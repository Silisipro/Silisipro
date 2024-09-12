import React, { Suspense } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '../configs/AppConfig';
import { protectedRoutes, publicRoutes } from '../configs/RoutesConfig';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AppRoute from './AppRoute';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <AppRoute
                                    routeKey={route.key}
                                    component={route.component}
                                    {...route.meta}
                                />
                            </Suspense>
                        }
                    />
                ))}
                <Route path="/" element={<Navigate replace to="/" />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedRoute />}>
                {protectedRoutes.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path.replace(`${APP_PREFIX_PATH}/`, '')}
                        element={
                            <Suspense fallback={<div>Loading...</div>}>
                                <AppRoute
                                    routeKey={route.key}
                                    component={route.component}
                                    {...route.meta}
                                />
                            </Suspense>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </RouterRoutes>
    );
};

export default Routes;
