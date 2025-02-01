import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/globals.css';
import { fetchConfig } from './config';

(async () => {
  await fetchConfig(); // Load runtime config before rendering
  ReactDOM.render(<App />, document.getElementById('root'));
})();