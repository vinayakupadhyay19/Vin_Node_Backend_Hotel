const passport = require('passport');
const Person = require('./models/person');
const LocalStrategy = require('passport-local').Strategy;


//passport dependecies use for authenticationand authorization
passport.use(new LocalStrategy(async (username , password , done) =>{
    //aunthentication logic here
    try{
        //console.log('Received credentials from server : [','username : '+username, ' , password : '+password + ' ]');
        const user = await Person.findOne({username : username});
        if(!user){
            return done(null , false , {message : 'Could not find this user'});
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null , user);
        }else{
            return done(null , false , {messege : 'Incorrect Password'} )
        }
    }catch(err){
        return next(err);
    }
}));

//export passport
module.exports = passport;