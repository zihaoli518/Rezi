import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';

import { useNavigate, useLocation } from "react-router-dom";






export default function SearchBar(props) {
  const theme = useTheme();
  const navigate = useNavigate();
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
    console.log('setParam', newParam, paramType);
    const newParamsState = {...searchParams};
    newParamsState[paramType] = newParam;
    setSearchParams(newParamsState);
  } 


  const handleSubmit = () => {
    console.log('inside handleSubmit in SearchBar', searchParams)
    const params = new URLSearchParams(searchParams).toString();
    navigate(`/restaurant-search-results?${params}`);
  };


  
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
        className={
          props.type === "landing"
            ? "background-image-search-bar"
            : "background-search-bar-sticky-top"
        }
        sx={{ flexGrow: 1 }}
        style={{
          backgroundImage:
            props.type === "landing" ? `url(${backgroundImage})` : "none",
          backgroundColor:
            props.type === "landing"
              ? "transparent"
              : theme.palette.primary.main,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: props.type === "landing" ? "40vh" : "8vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="search-bar-container">
          <DatePicker
            label="📅 Date"
            onChange={(newValue) => setParam(newValue, "date")}
            sx={{ backgroundColor: "white" }}
            variant="filled"
          />
          {/* <DateField label="Date" enableAccessibleFieldDOMStructure /> */}
          <TextField
            id="outlined-basic"
            onChange={(newValue) => setParam(newValue.target.value, "time")}
            label="⏱️ Time"
            sx={{ backgroundColor: "white" }}
            variant="filled"
          />
          <TextField
            id="outlined-basic"
            onChange={(newValue) => setParam(newValue.target.value, "place")}
            label="📍 Place"
            sx={{ backgroundColor: "white" }}
            variant="filled"
          />
          <TextField
            id="outlined-basic"
            onChange={(newValue) => setParam(newValue.target.value, "people")}
            label="🔢 People"
            sx={{ backgroundColor: "white" }}
            variant="filled"
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor:
                props.type === "landing" ? theme.palette.primary.main : theme.palette.secondary.main,
              color: "#fff", // Ensure text color is white for better contrast
              "&:hover": {
                backgroundColor:
                  props.type === "landing"
                    ? theme.palette.primary.dark
                    : "#333", // Darken color on hover
              },
            }}
            onClick={handleSubmit}
          >
            Search
          </Button>{" "}
        </div>
      </Box>
    </LocalizationProvider>
  );
}
