// landing page 
// includes search bar 

import * as React from 'react';
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useTheme } from '@mui/material/styles';


// importing other custom components 
import TopNavBar from './landing-page-components/TopNavBar.jsx';
import SearchBar from './landing-page-components/SearchBar.jsx';
import WhatsHot from './landing-page-components/WhatsHot.jsx';

import withAnimation from './hoc/withAnimation.jsx';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rezi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

function LandingPage() {

  const [statusMessage, setStatusMessage] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    let backendURL = '/api/login';
    if (process.env.NODE_ENV==='production') backendURL = 'hostedBackEnd' + backendURL;

    fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain',
      },
      body: JSON.stringify({username: data.get('email'), password: data.get('password'), type: 'customer'})
    })
      .then(data => data.json())
      .then((data) => {
        console.log('inside SignInSide.jsx submitHandler, ', data);
        if (data.status === 'username cannot be blank') {
          setStatusMessage(<Alert severity="warning">Username cannot be blank</Alert>)
        } else if (data.status === 'username not found') {
          setStatusMessage(<Alert severity="error">Username not found</Alert>)
        } else if (data.status === 'incorrect password') {
          setStatusMessage(<Alert fullWidth severity="error">Incorrect password</Alert>)
        } else {
          // successful login credentials - navigate to 
          navigate("/landing")
          console.log('about to fetch GET landing')
        }
        setOpen(false);
      })
  };
  
  const navigate = useNavigate();

  // const handleNavigateSignUp = () => {
  //   navigate("/signup")
  // }
  const theme = useTheme();


  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        style={{ width: "100%" }}
      >
        {/* this is the grid container for the nav bar */}
        <Grid
          className="top-nav-bar"
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
          style={{ width: "100%" }}
        >
          <TopNavBar style={{ width: "100%" }} />

        </Grid>

        {/* this is the grid container for the search bar */}
        <Grid
          className="search-bar-section"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ width: "100%", height: "30%", maxHeight: "30%" }}
        >
          <SearchBar type='landing' style={{ width: "100%" }} />

        </Grid>

        {/* this is the grid container for the whats hot section */}
        <Grid
          className="whats-hot-section"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ width: "100%" }}
        >
          <div style={{ width: "100%" }}>
            < WhatsHot />
          </div>
        </Grid>
      </Grid>
      

    <Copyright sx={{ mt: 5 }} />

    </ThemeProvider>
  );
}

export default withAnimation(LandingPage);