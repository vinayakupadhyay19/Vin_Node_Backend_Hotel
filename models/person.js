const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');

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

personShema.pre('save' , async function(next){
    const person = this;
    // Hash the password only if it has been modified (or it is new)
    if(!person.isModified('password')) return next();
    try{
        // hash password genereation 
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(person.password , salt);
        // Override the plain password with hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personShema.methods.comparePassword = async function(candidatePassword){
    try{
        //use the bcrypt to compare the password  with the hashed password 
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

// Create the Person model

const Person = mongoose.model('Person', personShema);
module.exports = Person;