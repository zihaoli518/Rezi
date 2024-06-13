const path = require('path');
require('dotenv').config({path: path.resolve(__dirname+'../../../.env')});


const db = require('../dbModel.js');
const bcrypt = require('bcrypt');
const saltFactor = 10;
const jwt = require('jsonwebtoken')

const restaurantControllers = {};


restaurantControllers.registerRestaurantData = (req, res, next) => {
  if (req.body.type === 'customer' || res.locals.signUpData.status === "username already exists") return next();

  const { email, restaurantName, cuisineType, address } = req.body;

  let table = 'restaurant_data';

  const signupQuery = `INSERT INTO ${table} (username, name, cuisine, address) VALUES ($1, $2, $3, $4)`;
  db.query(signupQuery, [email, restaurantName, cuisineType, address])
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

