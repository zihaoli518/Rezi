import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';



export default function SearchBar() {
  const [backgroundImage, setBackgroundImage] = React.useState('https://static.vecteezy.com/system/resources/previews/002/094/486/large_2x/defocused-coffee-shop-and-restaurant-background-free-photo.jpg');
  const [searchParams, setSearchParams] = React.useState({
    date: '', 
    time: '',
    place: '',
    people: 0,
  });

  const cycleBackgroundImage = () => {
    const urlArray = ['https://www.creativefabrica.com/wp-content/uploads/2023/09/03/Restaurant-Background-Graphics-78429994-1.jpg', 'https://static.vecteezy.com/system/resources/previews/002/094/486/large_2x/defocused-coffee-shop-and-restaurant-background-free-photo.jpg']
    const randomIndex = Math.floor(Math.random() * 2);
    if (backgroundImage!==urlArray[randomIndex]) setBackgroundImage(urlArray[randomIndex]);
  }


  
  
  const setParam = (newParam, paramType) => {
    console.log(newParam, paramType);
    const newParamsState = {...searchParams};
    newParamsState[paramType] = newParam;
    setSearchParams(newParamsState);
  } 
  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      cycleBackgroundImage();
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        className="background-image-search-bar"
        sx={{ flexGrow: 1 }} 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '40vh',
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className='search-bar-container'>

          <DatePicker label="📅 Date" onChange={(newValue) => setParam(newValue, 'date')} sx={{backgroundColor: 'white', }} variant="filled" />
          {/* <DateField label="Date" enableAccessibleFieldDOMStructure /> */}

          <TextField id="outlined-basic" onChange={(newValue) => setParam(newValue, 'time')} label="⏱️ Time" sx={{backgroundColor: 'white', }} variant="filled"  />
          <TextField id="outlined-basic" onChange={(newValue) => setParam(newValue, 'place')} label="📍 Place" sx={{backgroundColor: 'white', }} variant="filled"  />
          <TextField id="outlined-basic" onChange={(newValue) => setParam(newValue, 'people')} label="🔢 People" sx={{backgroundColor: 'white', }} variant="filled"  />

          <Button variant="contained">Search</Button>
        </div>

      </Box>
    </LocalizationProvider>

  );
}
