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
        path: `/auth/login`,
        component: React.lazy(() => import('../pages/auth/login/index')),
        meta: {
            blankLayout: true
        }
    },
    {
        key: 'register',
        path: `/auth/register`,
        component: React.lazy(() => import('../pages/auth/register/index')),
        meta: {
            blankLayout: true
        }
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard.default',
        path: `/dashboard`,
        component: React.lazy(() => import('../pages/dashboard/index')),
    },
    {
        key: 'dashboard.youtube',
        path: `/dashboard/dashboard/youtube_service`,
        component: React.lazy(() => import('../pages/dashboard/youtube/index')),
    },
    {
        key: 'dashboard.meteo',
        path: `/dashboard/dashboard/weather`,
        component: React.lazy(() => import('../pages/dashboard/meteo/index')),
    },
]