import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

export const RouterConfig = createBrowserRouter([
  {
    path: '/',
    Component: lazy(() => import('./Home')),
  },
  {
    path: '/chat',
    Component: lazy(() => import('./Chat/index')),
    children: [
      { index: true, Component: lazy(() => import('./Chat/ChatNewCreate')) },
      { path: ':uuid', Component: lazy(() => import('./Chat/ChatBox')) },
      { path: 'setting', Component: lazy(() => import('./Chat/ChatSetting')) },
    ],
  },
]);
