
import { createBrowserRouter } from 'react-router';

import {
  ChatBox,
  ChatLayout,
  ChatNewCreate,
  ChatSetting,
} from './Chat';
import Home from "./Home";

export const RouterConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/chat',
    element: <ChatLayout />,
    children: [
      { index: true, element: <ChatNewCreate /> },
      { path: ':uuid', element: <ChatBox /> },
      { path: 'setting', element: <ChatSetting /> }
    ]
  }
]);
