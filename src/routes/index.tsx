import { CreateNewChat } from '~/components/common/CreateNewChat';

import { createBrowserRouter } from 'react-router';

import Home from "./Home";
import App from './App';

// export const Routing = () => {
//   return (
//     <Routes>
//       <Route index path="/" element={<CreateNewChat />}></Route>
//       <Route path="/chat/:uuid" element={<App />}></Route>
//     </Routes>
//   );
// };


export const RouterConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/chat'
  }
]);
