const mongoose = require('mongoose');
require('dotenv').config();
//Define the Mongo Db connection Url.
const mongoDBLocal = process.env.LOCAL_URL;// for local url
const mongoDBAtlas = process.env.DB_URL; // for Atlas url
const mongoUrl = mongoDBAtlas;

//Set up the MongoDB connection 
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the deafault connection
const db = mongoose.connection;

//Define event listeners for the connection.
db.on('connected', () => {
    console.log('MongoDb Connection established successfully');
});

db.on('error', () => {
    console.log('MongoDb Connection failed');
});

db.on('disconnected', () => {
    console.log('MongoDb Connection Disconnected');
});


module.exports = db;