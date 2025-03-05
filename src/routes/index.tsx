import { CreateNewChat } from '~/components/common/CreateNewChat';

import { Route, Routes } from 'react-router';

import App from './App';

export const Routing = () => {
  return (
    <Routes>
      <Route index path="/" element={<CreateNewChat />}></Route>
      <Route path="/chat/:uuid" element={<App />}></Route>
    </Routes>
  );
};
