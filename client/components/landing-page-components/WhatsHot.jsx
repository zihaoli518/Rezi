import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';




export default function WhatsHot() {
  const [backgroundImage, setBackgroundImage] = React.useState('https://wallpapers.com/images/featured/restaurant-background-2ez77umko2vj5w02.jpg');
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const cycleBackgroundImage = () => {
  //   const urlArray = ['https://www.creativefabrica.com/wp-content/uploads/2023/09/03/Restaurant-Background-Graphics-78429994-1.jpg', 'https://wallpapers.com/images/featured/restaurant-background-2ez77umko2vj5w02.jpg', 'https://static.vecteezy.com/system/resources/previews/002/094/486/large_2x/defocused-coffee-shop-and-restaurant-background-free-photo.jpg']
  //   const randomIndex = Math.floor(Math.random() * 3);
  //   setBackgroundImage(urlArray[randomIndex])
  // }


  React.useEffect(() => {
    const intervalId = setInterval(() => {
      // cycleBackgroundImage();
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const theme = useTheme();

  return (
    <Box 
      className="'whats-hot-box'"
      sx={{ flexGrow: 1 }} 
      style={{
        height: '40vh',
        backgroundColor: theme.palette.secondary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className='whats-hot-container'>
        <Typography variant="h3" gutterBottom
          style={{
            color: theme.palette.primary.main,
            alignSelf: 'flex-start',
            justifyContent: 'flex-end',
            margin: 0,
            marginTop: 'auto'
            // position: 'relative',
            // top: '10%',
            // left: '-20%'
          }}>
          whats hot
        </Typography>

        <div className='whats-hot-pictures-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ArrowCircleLeftIcon style={{ width: '3%' }} />
          <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '80%', width: '94%' }}>
            <Grid item xs={4} sm={4} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Paper elevation={8} sx={{ height: '100%', width: '70%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(https://hips.hearstapps.com/hmg-prod/images/edc110120monsquare05-1603380226.jpg?crop=0.760xw:1.00xh;0.105xw,0&resize=640:*)' }} />
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Paper elevation={8} sx={{ height: '100%', width: '70%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(https://images.getbento.com/accounts/73872f6245d057f16d798619e11a0945/media/images/94966UNION_SQUARE_CAFE_BRIAN_SAMUELS_PHOTOGRAPHY_OCTOBER_2022-IMG_4359_copy_2.jpg?w=1200&fit=crop&auto=compress,format&crop=focalpoint&fp-x=0.5&fp-y=0.5)' }} />
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Paper elevation={8} sx={{ height: '100%', width: '70%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(https://pershingsquare.com/wp-content/uploads/2022/03/dinner-42nd-st-nyc-pershing-square-1024x1024.jpg)' }} />
            </Grid>
          </Grid>
          <ArrowCircleRightIcon style={{ width: '3%' }} />
        </div>
      </div>

    </Box>
  );
}
