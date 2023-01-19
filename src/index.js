import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './_app/App';
import reportWebVitals from './reportWebVitals';

const APP_TITLE = process.env.REACT_APP_TITLE;
const titleTag = document.getElementById("my_title");
titleTag.innerText = APP_TITLE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
