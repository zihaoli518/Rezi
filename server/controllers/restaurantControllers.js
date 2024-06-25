const path = require('path');
require('dotenv').config({path: path.resolve(__dirname+'../../../.env')});


const db = require('../dbModel.js');
const bcrypt = require('bcrypt');
const saltFactor = 10;
const jwt = require('jsonwebtoken')

const restaurantControllers = {};


restaurantControllers.registerRestaurantData = (req, res, next) => {
  if (req.body.type === 'customer' || res.locals.signUpData.status === "username already exists") return next();

  const { email, restaurantName, cuisineType, address, pictureUrl, phoneNumber, openingHours, websiteUrl, description, ownerName, capacity, specialFeatures, menuUrl, deliveryService, reservationRequired } = req.body;

  let table = 'restaurant_data';

  const signupQuery = `
    INSERT INTO ${table} 
    (username, name, cuisine, address, picture_url, phone_number, opening_hours, website_url, description, owner_name, capacity, special_features, menu_url, delivery_service, reservation_required) 
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  `;

  const values = [
    email, 
    restaurantName, 
    cuisineType, 
    address, 
    pictureUrl,
    phoneNumber, 
    openingHours, 
    websiteUrl, 
    description, 
    ownerName, 
    capacity, 
    specialFeatures, 
    menuUrl, 
    deliveryService, 
    reservationRequired
  ];

  db.query(signupQuery, values)
    .then(() => {
      return next()
    })
};


restaurantControllers.logIn = (req, res, next) => {
};


restaurantControllers.getUserData = (req, res, next) => {
  console.log('inside middleware getUserData,', req.cookies);
  const username = req.params.username;
  // const decodedUsername = jwt.verify(req.cookies.PokemonTeamBuilder, process.env.JWT_SECRET);

  console.log(username, decodedUsername)
  if (decodedUsername === username) {
    console.log('SAME JWT TOKEN!')

  }
  return next()
}


module.exports = restaurantControllers;

