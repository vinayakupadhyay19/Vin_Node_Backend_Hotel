const express = require('express');
const bodyParser = require('body-parser');
const personRoute = require('./routes/routesPerson');
const menuRoute = require('./routes/routesMenu');
const passport = require('./auth');
const Person = require('./models/person');
const db = require('./db');
const { genToken, jwtAuthMiddleware } = require('./jwt');
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

//Api endpoint any person signup
app.post('/person/signup', async (req, res) => {
    try {
        //Extract the data from the request.
        const data = req.body;
        //Create a new person documnet using  the Mongoose model.

        const newPerson = new Person(data);

        const savedPerson = await newPerson.save();

        const payload = {
            id : savedPerson.id,
            username  : savedPerson.username
        }
        const token = genToken(payload);  
        console.log('Saved.. !');
        res.status(200).json({Data : savedPerson,Token : token});

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
});


//Using both api endpoints through roter in node.js
app.use('/person',personRoute);
app.use('/menu', menuRoute);

//listening on port http://localhost:3000 Port details
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});