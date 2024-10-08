import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/home/ocean.css';
import './css/home/bubble.css';
import './css/home/field.css';
// import App from './js/App';
import Ocean from './js/home/ocean.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const body = ReactDOM.createRoot(document.querySelector('body'));
body.render(
  <BrowserRouter>
    <Ocean />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();