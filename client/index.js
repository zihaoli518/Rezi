// importing react dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// importing App component 
import App from './App.jsx';




render(
    <BrowserRouter>

        <App />

    </BrowserRouter>,
  document.getElementById("app")
);
