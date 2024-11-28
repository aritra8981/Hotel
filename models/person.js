const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Create Person Schema
const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },

    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },

    address:{
        type:String
    },

    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

//Hash the password before saving the user
personSchema.pre('save', async function(next){
    const person = this;

    //Hash the password only if the password is modified or the user is new
    if(!person.isModified('password')) return next();

    try{
        //hash the password generate
        const salt = await bcrypt.genSalt(10);

        //Hash the password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Replace the plain text password with the hash password
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

//Compare the password
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//Create Person Model

const Person= mongoose.model('Person', personSchema);
module.exports = Person;