import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

import i18n from 'i18next';
import { useTranslation, initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
//import reportWebVitals from './reportWebVitals';

//init language dynamically
///////* i18next *///////
i18n
.use(initReactI18next)
.use(LanguageDetector)
.use(HttpApi)
.init({
  supportedLngs: ['fr','en'],
  fallbackLng: "fr",
  detection: {
    order: ['localstorage', 'htmlTag', 'cookie', 'path', 'navigator','subdomain' ],
    caches: ['localstorage', 'cookie']
  },
  backend: {
    loadPath: '/assets/locales/{{lng}}/translation.json'
  },
  react: { useSuspense: false }
  
})
////////////////////////

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
