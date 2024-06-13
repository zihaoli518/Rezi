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

export default function AddRestaurntPage() {

  const [statusMessage, setStatusMessage] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    restaurantName: '',
    cuisineType: '',
    address: '',
    email: '',
    password: '',
    pictureUrl: '',
    phoneNumber: '',
    openingHours: '',
    websiteUrl: '',
    description: '',
    ownerName: '',
    capacity: '',
    specialFeatures: '',
    menuUrl: '',
    deliveryService: false,
    reservationRequired: false,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  
  const handleSubmit = (event) => {
    handleOpen();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });


    let backendURL = '/api/signup';
    if (process.env.NODE_ENV==='production') backendURL = 'hostedBackEnd' + backendURL;

    const reqBodyObj = {username: data.get('email'), password: data.get('password'), type: 'restaurant'}; 
    for (let field in formValues) reqBodyObj[field] = formValues[field];


    fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain',
      },
      body: JSON.stringify(reqBodyObj)
    })
      .then(data => data.json())
      .then((data) => {
        handleClose();
        console.log('inside Signup.jsx submitHandler, ', data);
        if (data.status === 'success') {
          setStatusMessage(<Alert severity="success">Account successfully created</Alert>)
        } else if (data.status === 'username already exists') {
          setStatusMessage(<Alert severity="error">Username already exists</Alert>)
        }
      })
  };
  
  const navigate = useNavigate();

  const theme = useTheme();


  return (
    <ThemeProvider theme={theme}>
  <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: '20%',
      paddingRight: '20%',

    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Add Restaurant
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="restaurantName"
            required
            fullWidth
            id="restaurantName"
            label="Restaurant Name"
            autoFocus
            value={formValues.restaurantName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="cuisineType"
            label="Cuisine Type"
            name="cuisineType"
            autoComplete="family-name"
            value={formValues.cuisineType}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={formValues.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="tel"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="openingHours"
            label="Opening Hours"
            name="openingHours"
            autoComplete="opening-hours"
            value={formValues.openingHours}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="capacity"
            label="Capacity"
            name="capacity"
            autoComplete="capacity"
            value={formValues.capacity}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="websiteUrl"
            label="Website URL"
            name="websiteUrl"
            autoComplete="url"
            value={formValues.websiteUrl}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="ownerName"
            label="Owner's Name"
            name="ownerName"
            autoComplete="owner-name"
            value={formValues.ownerName}
            onChange={handleInputChange}
          />
        </Grid>


        <Grid item xs={12}>
          <TextField
            fullWidth
            id="menuUrl"
            label="Menu URL"
            name="menuUrl"
            autoComplete="menu-url"
            value={formValues.menuUrl}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.deliveryService}
                onChange={handleInputChange}
                name="deliveryService"
                color="primary"
              />
            }
            label="Delivery Service"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.reservationRequired}
                onChange={handleInputChange}
                name="reservationRequired"
                color="primary"
              />
            }
            label="Reservation Required"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up Restaurant
      </Button>
      {statusMessage}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            Already have a restaurant? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
  <Copyright sx={{ mt: 5 }} />
</ThemeProvider>

  );
}