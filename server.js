const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt');


// Environment variables
require('dotenv').config();
const { DB_NAME, DB_PASS, PORT } = process.env;


// Express - Use stuff
const cookieparser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');


// Route Handlers
const registerHandler = require('./routeHandlers/registerHandler');
const loginHandler = require('./routeHandlers/loginHandler');


// Initiating stuff
const app = express();
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: DB_PASS,
    database: DB_NAME
  }
})


// App.use
app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(session({
  name: 'user_sid',
  secret: "this-is-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2*(100*60*60)
  }
}))

app.use((req,res,next) => {
  if (req.cookies.user_sid && !req.session.user){
    res.clearCookie('user_sid');
  }
  next();
})

// Some to use
const isAuth = (req,res,next) => {
  if (req.session.user) {
    next()
  } else {
    return res.status(400).json({error: "You are Not authenticated"});
  }
}


// Routes
app.post('/register', (req,res) => registerHandler(req,res,db,bcrypt));
app.post('/login', (req,res) => loginHandler(req,res,db,bcrypt));

app.get('/isAuthenticated', isAuth, (req,res) => {
  res.json({message: "You are authenticated"});
  
})

app.get('/logout', isAuth, (req,res) => {
  res.clearCookie('user_sid');
  res.json({message:"You have successfully logged out!"});
})

// Start Server
app.listen(PORT, () => {
  console.log("Running server at post",PORT);
});