import React from 'react'


export const publicRoutes = [
    {
        key: 'home',
        path: `/`,
        component: React.lazy(() => import('../pages/site/Home')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'login',
        path: `/login`,
        component: React.lazy(() => import('../pages/auth/login/index')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'register',
        path: `/register`,
        component: React.lazy(() => import('../pages/auth/register/index')),
        meta: {
            blankLayout: true
        }
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `/dashboards/default`,
        component: React.lazy(() => import('../pages/dashboard/index')),
    },
    {
        key: 'dashboard.youtube',
        path: `/dashboards/youtube_service`,
        component: React.lazy(() => import('../pages/dashboard/youtube/index')),
    },
]