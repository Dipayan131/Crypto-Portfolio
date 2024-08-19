import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './contexts/AppContext';
import './index.css';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root.
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
