const mongoose = require('mongoose');
const { type } = require('os');

const personShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    username : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    }
});

// Create the Person model

const Person = mongoose.model('Person', personShema);
module.exports = Person;