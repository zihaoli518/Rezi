import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const defaultTheme = createTheme();

const actions = [
  { icon: <HomeIcon />, name: 'Landing', path: '/landing' },
  { icon: <PersonAddIcon />, name: 'Sign Up', path: '/signup' },
  { icon: <RestaurantIcon />, name: 'Add Restaurant', path: '/add-restaurant' },
  { icon: <ManageSearchIcon />, name: 'Search Results', path: '/restaurant-search-results' },
];

export default function FloatingNavigator() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleNavigation(action.path)}
          />
        ))}
      </SpeedDial>
    </ThemeProvider>
  );
}
