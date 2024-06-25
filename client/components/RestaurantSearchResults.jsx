import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import SearchBar from './landing-page-components/SearchBar.jsx';

import withAnimation from './hoc/withAnimation.jsx';

const theme = createTheme({
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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a color="inherit" href="https://mui.com/">
        Rezi
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




function RestaurantSearchResults() {
  const theme = useTheme();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const searchParams = new URLSearchParams(location.search);

  // const fadeIn = useSpring({
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  //   config: { duration: 1000 }
  // });

  const query = {
    date: searchParams.get('date'),
    time: searchParams.get('time'),
    place: searchParams.get('place'),
    people: searchParams.get('people'),
  };

  console.log('inside RestaurantSearchResults, ', location, searchParams, query)


  useEffect(() => {
    console.log('inside useEffect')
    if (query) {
      setLoading(true);
      const queryStr = `/api/search?date=${query.date}&time=${query.time}&place=${query.place}&people=${query.people}`;
      fetch(queryStr, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain',
        },
        // body: JSON.stringify({username: data.get('email'), password: data.get('password'), type: 'customer'})
      })
        .then(data => data.json())
        .then((data) => {
          console.log(data);
          setResults(data)
          setLoading(false);
        })
    }
  }, [location.search]);

  // if (loading) {
  //   return <CircularProgress />;
  // }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        // direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Grid
          className="search-bar-sticky-top"
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
          style={{ width: "100%", height: "8%", position: 'fixed', top: '0' }}
        >
          <SearchBar type="sticky" style={{ width: "100%" }} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ marginTop: '5%', width: '100%', height: '5%', width: '50%'}} // Add margin top to offset the fixed search bar
        >
          <Typography variant="h5"  style={{marginLeft:'10%', height: '5%'}} >
            Search Results for "{query.place}"
          </Typography>
        </Grid>

        <Grid
          className="search-results-container"
          item
          xs={8}
          sm={8}
          md={8}
          style={{ width: "60%", height: "80%", overflow: "scroll"}}
        >
          {loading ? (
            <CircularProgress />
          ) : results.length > 0 ? (
            results.map((restaurant, index) => (
              <Card key={index} sx={{ marginBottom: 2 }} style={{ width: "95%", height: "40%", display: "flex", justifyContent: "flex-start"}}>
                <div className='card-left-container' style={{width: "30%", height: "100%"}}>
                <CardMedia
                  component="img"
                  height="50%"
                  width={"50%"}
                  image={restaurant.picture_url} // Replace with actual property name
                  alt={restaurant.name} // Replace with actual property name
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cuisine: {restaurant.cuisine}{" "}
                    {/* Replace with actual property name */}
                  </Typography>
                </CardContent>
                </div>

                <div className='card-left-container' style={{width: "70%", height: "100%"}}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {restaurant.phone_number}{" "}
                    {/* Replace with actual property name */}
                  </Typography>
                </CardContent>
                </div>

              </Card>
            ))
          ) : (
            <Typography variant="body1">No results found</Typography>
          )}
        </Grid>

      <Grid
        xs={12}
        sm={12}
        md={12}
        style={{ width: "60%", height: "85%" }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Grid>
      </Grid>
    </ThemeProvider>
  );
}


export default withAnimation(RestaurantSearchResults);