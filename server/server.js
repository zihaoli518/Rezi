const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = 3000; 

// const fetchMiddlewares = require('./controllers/fetchMiddlewares.js');
const userMiddlewares = require('./controllers/userMiddlewares.js');

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json({limit: '50mb'}));

// taking care of CORS
app.use(cors());

app.use((req, res, next) => {
  console.log('inside first app.use, ');

  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  // another common pattern
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )


  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // check for user permission with cookies 
  if (req.cookies.PokemonTeamBuilder)  {
    res.header('cookie', req.cookies);
  }
  next();
});

// // increasing request limit so teams can be saved 
// app.use(express.bodyParser({limit: '50mb'}));


// // statically serve everything in the build folder on the route '/build'
// serve static content from the asset folder
app.use('/static', 
express.static(path.join(__dirname, '../assets')));
// serving bundle file output from webpack build in production mode 
app.use('/public', 
express.static(path.join(__dirname, '../public')));

app.use(express.static('public', { 
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));


// serve index.html on the route '/'
app.get('/', (req, res) => {
  console.log('get/ complete')
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.post('/api/signup', userMiddlewares.signUp, (req, res) => {
  console.log('/api/signup complete', res.locals)
  return res.status(200).send(res.locals.signUpData)
})

app.post('/api/login', userMiddlewares.logIn, (req, res) => {
  console.log('/api/login complete');
  console.log(res.locals)
  return res.status(200).send(res.locals.logInData)
})


// app.post('/api/exportMon', convertTeamFormatMiddlewares.exportMon, (req, res) => {
//   console.log('/api/exportMon complete')
//   return res.status(200).send({exportedSet: res.locals.exportedSet})
// })


// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 444,
    message: {err: 'an error occurred'}
  };
  const errorObj = Object.assign({}, defaultErr);
  errorObj.message.err = err;
  console.log('ERROR: ', err);

  return res.status(errorObj.status).send(errorObj.message);
});


// Handle OPTIONS requests
app.options('*', cors());


app.listen(PORT); 

module.exports = app;