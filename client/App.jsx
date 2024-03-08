// importing dependencies
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Router
} from "react-router-dom";

import SignInSide from './components/SignInSide.jsx';
import SignUp from './components/SignUp.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';


function App() {


  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<SignInSide />} />
        <Route exact path="/login" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
}


export default App;
