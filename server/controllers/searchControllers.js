const path = require('path');
require('dotenv').config({path: path.resolve(__dirname+'../../../.env')});


const db = require('../dbModel.js');
const bcrypt = require('bcrypt');
const saltFactor = 10;
const jwt = require('jsonwebtoken')

const searchControllers = {};


searchControllers.search = (req, res, next) => {
  console.log('/api/search registerRestaurantData: ', req.params);



  const query = 'SELECT * FROM restaurant_data'


  db.query(query)
    .then((data) => {
      console.log('search result from database: ', data);
      res.locals = data.rows;
      return next()
    })
};



module.exports = searchControllers;

