// project import
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import * as React from 'react';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const LandingPage = () => {
  console.log('inside landingpage ', Routes, typeof(Routes))


  return(
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
    )
  };

export default LandingPage;
