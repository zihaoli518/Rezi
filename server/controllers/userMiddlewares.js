const path = require('path');
require('dotenv').config({path: path.resolve(__dirname+'../../../.env')});


const db = require('../dbModel.js');
const bcrypt = require('bcrypt');
const saltFactor = 10;
const jwt = require('jsonwebtoken')

const userMiddlewares = {};


userMiddlewares.signUp = (req, res, next) => {
  console.log('sign up time bitches!');
  const { username, password, type } = req.body;
  bcrypt.hash(password, saltFactor, async (err, hash) => {
    if (err) {
      return next(err);
    }
    try {
      const userExists = await checkUserAlreadyExist(username, type);
      if (userExists) {
        res.locals.signUpData = { status: "username already exists" };
      } else {
        await signUpUser(username, hash, type);
        res.locals.signUpData = { status: "success", username: username };
      }
      return next();
    } catch (error) {
      return next(error);
    }
  });

  async function checkUserAlreadyExist(username, type) {
    const checkUserQuery = `SELECT * FROM users_${type} WHERE username = '${username}'`;
    const bool = db.query(checkUserQuery) 
      .then((dbResponse) => {
        if (dbResponse.rows[0]) return true;
        else return false;
      })
    return bool
  }

  async function signUpUser(username, hash, type) {
    let table = '';
    if (type === 'customer') table = 'users_customer';
    const signupQuery = `INSERT INTO ${table} (username, password) VALUES ($1, $2)`;
    db.query(signupQuery, [username, hash]);
  }
};


userMiddlewares.logIn = (req, res, next) => {
  const { username, type } = req.body;
  const query = `SELECT password FROM users_${type} WHERE username = '${username}'`;
  // query database to see if that username exists
  db.query(query)
    .then(dbResponse => {
      if (username==='') {
        res.locals.logInData = {status: 'username cannot be blank'};
        return next();
      }
      if (dbResponse.rows[0] === undefined) {
        // if nothing is found, return 401 status
        res.locals.logInData = {status: 'username not found'};
        return next();
      } 
      else {
        // if record is found, compare password
        const { password } = dbResponse.rows[0];
        bcrypt.compare(req.body.password, password, (err, result) => { 
          // if bcrypt.compare returns an unknown error, return an error
          if (err) { 
            return next({
              log: `userController.verifyUser: ERROR: Error comparing password: ${err}`,
              message: { err: 'Error comparing password' },
            });
          }
          if (result) {
            res.locals.logInData = {status: 'correct password'};
            return next();
          }
          else {
            // if passwords don't match, return 401 status
            res.locals.logInData = {status: 'incorrect password'};
            return next();
          }
        });
      }
    })
    .catch(err => {
      return next(err);
    });
};


userMiddlewares.getUserData = (req, res, next) => {
  console.log('inside middleware getUserData,', req.cookies);
  const username = req.params.username;
  // const decodedUsername = jwt.verify(req.cookies.PokemonTeamBuilder, process.env.JWT_SECRET);

  console.log(username, decodedUsername)
  if (decodedUsername === username) {
    console.log('SAME JWT TOKEN!')

  }
  return next()
}


module.exports = userMiddlewares;

