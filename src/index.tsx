import React from 'react';
import ReactDOM from 'react-dom/client';
import Bootstrap from './bootstrap';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Bootstrap />
    </React.StrictMode>,
  );
}
