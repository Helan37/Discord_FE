import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import
import './index.css';
import App from './App'; // Make sure this is correct
// import reportWebVitals from './reportWebVitals';

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root')!); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals(); // Uncomment this if you need to report web vitals
