import React, { useState } from 'react';
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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';


import TopNavBar from './landing-page-components/TopNavBar.jsx';
import withAnimation from './hoc/withAnimation.jsx';

const defaultTheme = createTheme();

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

function UserProfilePage() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleProfilePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Handle form submission logic
    console.log('Form submitted:', {
      username: data.get('username'),
      email: data.get('email'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        style={{ width: "100%" }}
      >
        {/* NavBar */}
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

        {/* Profile Info */}
        <Grid
          className="user-profile-section"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ width: "100%", padding: '20px', marginTop: '20px' }}
        >
          <Typography component="h1" variant="h5" align="center">
            User Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} align="center">
                <Avatar
                  alt="Profile Picture"
                  src={profilePicture}
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Profile Picture
                  <input
                    type="file"
                    hidden
                    onChange={handleProfilePictureChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </ThemeProvider>
  );
}

export default withAnimation(UserProfilePage);
