const express = require('express');
const bodyParser = require('body-parser');
const personRoute = require('./routes/routesPerson');
const menuRoute = require('./routes/routesMenu');
const passport = require('./auth');
const db = require('./db');
require('dotenv').config();



//Middleware function (Specifically used for logs of date and url)
const logRequest = (req , res , next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next(); //Move to next phase.
} 

//app for express server
const app = express();


//use function of express server
app.use(bodyParser.json());
app.use(logRequest);
app.use(passport.initialize());


//intializing passport middleware for authentication
const localAuthMiddleware = passport.authenticate('local' , {session : false});

//home api enpoint
app.get('/',(req, res) => {
    res.send('Hello node server how are you ?')
});


//Using both api endpoints through roter in node.js
app.use('/', localAuthMiddleware ,personRoute);
app.use('/', menuRoute);

//listening on port http://localhost:3000 Port details
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});