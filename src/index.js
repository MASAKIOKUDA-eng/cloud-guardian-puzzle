import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App';
import { LanguageProvider } from './i18n/LanguageContext';
import '../assets/styles/main.css';
import '../assets/styles/tetris.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <Router basename="/">
        <App />
      </Router>
    </LanguageProvider>
  </React.StrictMode>
);
