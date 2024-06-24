const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')
const Person = require('./models/person');
const MenuItems = require('./models/menuItem');
const personRoute = require('./routes/routesPerson');
const menuRoute = require('./routes/routesMenu');
require('dotenv').config();


//Middleware function...
const logRequest = (req , res , next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next(); //Move to next phase.
} 




const app = express();
app.use(bodyParser.json());

app.use(logRequest);

//For person api enpoint
app.get('/', (req, res) => {
    res.send('Hello node server how are you ?');
});

app.use('/', personRoute);
app.use('/', menuRoute);

//Hey now I am taking all the snapshot of our code through the help of Git..


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});