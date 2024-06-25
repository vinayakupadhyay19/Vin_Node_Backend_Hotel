const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')
const Person = require('./models/person');
const MenuItems = require('./models/menuItem');
const personRoute = require('./routes/routesPerson');
const menuRoute = require('./routes/routesMenu');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



//Middleware function...
const logRequest = (req , res , next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next(); //Move to next phase.
} 

const app = express();
app.use(bodyParser.json());

app.use(logRequest);

passport.use(new LocalStrategy(async (username , password , done) =>{
    //aunthentication logic here
    try{
        console.log('Received credentials from server : [','username : '+username, ' , password : '+password + ' ]');
        const user = await Person.findOne({username : username});
        if(!user){
            return done(null , false , {message : 'Could not find this user'});
        }

        const isPasswordMatch = (user.password === password) ? true : false;
        if(isPasswordMatch){
            return done(null , user);
        }else{
            return done(null , false , {messege : 'Incorrect Password'} )
        }
    }catch(err){
        return done(err);
    }
}))


app.use(passport.initialize());

//For person api enpoint
app.get('/',passport.authenticate('local' , {session : false}),(req, res) => {
    res.send('Hello node server how are you ?');
});

app.use('/', personRoute);
app.use('/', menuRoute);

//Hey now I am taking all the snapshot of our code through the help of Git..


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});