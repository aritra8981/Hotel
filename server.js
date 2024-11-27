const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy; //Local Strategy / Basic Authentication

const bodyParser = require('body-parser')
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000; //PORT number is set to 3000


//Import the router files
const personRoutes = require('./routes/personRoutes.js');
const menuItemRoutes = require('./routes/menuItemRoutes.js');
const Person = require('./models/person.js');



//Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //Pass the request to the next middleware function in the pipeline
}

app.use(logRequest); //Use the middleware function
passport.use(new localStrategy(async (USERNAME, password, done) => {
    try{
        console.log('Received Credentils: ', USERNAME, password);
        const user = await Person.findOne({username: USERNAME,}); //Find the user with the given username
        if(!user){
            return done(null, false, {message: 'Invalid Username'}); //If the user is not found, return false
        }
        const isPasswordMatch = user.password === password?true:false; //Check if the password matches
        if(isPasswordMatch){
            return done(null, true); //If the password matches, return true
        }else{
            return done(null, false, {message: 'Invalid Password'});  //If the password does not match, return false
          }
      } catch(err){
            return done(err);
    }
}));

app.use(passport.initialize()); //Initialize the passport
  
const localauthMiddleware = passport.authenticate('local', {session: false}); //Authenticate the user using the local strategy
app.get('/', localauthMiddleware, function (req, res) {
  res.send('Hello Everyone, Welcome to our Hotel')
})

//Use the router files
app.use('/person',localauthMiddleware,personRoutes);
app.use('/menuitem',localauthMiddleware,menuItemRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})