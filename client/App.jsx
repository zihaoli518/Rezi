// importing dependencies
// react 
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Router
} from "react-router-dom";
// mui 
import { createTheme, ThemeProvider} from '@mui/material/styles';
// components 
import SignInSide from './components/SignInSide.jsx';
import SignUp from './components/SignUp.jsx';
import LandingPage from './components/LandingPage.jsx';
import AddRestaurntPage from './components/AddRestaurntPage.jsx';
import FloatingNavigator from './components/FloatingNavigator.jsx';
import RestaurantSearchResults from './components/RestaurantSearchResults.jsx';
import UserProfilePage from './components/UserProfilePage.jsx';

// theme 
let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5e7d9a',
    },
    secondary: {
      main: '#dab47a',
    },
  },
});


function App() {


  return (
    <div className="app" style={{ width: '100%', height: '100%'}}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route exact path="/login" element={<SignInSide />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-restaurant" element={<AddRestaurntPage />} />
          <Route path="/restaurant-search-results" element={<RestaurantSearchResults />} />
          
          <Route path="/user-profile" element={<UserProfilePage />} />


        </Routes>
        < FloatingNavigator />
      </ThemeProvider>
    </div>
  );
}


export default App;
