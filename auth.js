const passport = require("passport");
const localStrategy = require("passport-local").Strategy; //Local Strategy / Basic Authentication
const Person = require("./models/person.js");

//Passport Authentication
passport.use(
  new localStrategy(async (USERNAME, password, done) => {
    try {
      // console.log('Received Credentils: ', USERNAME, password);
      const user = await Person.findOne({ username: USERNAME }); //Find the user with the given username
      if (!user) {
        return done(null, false, { message: "Invalid Username" }); //If the user is not found, return false
      }
      const isPasswordMatch = user.password === password ? true : false; //Check if the password matches
      if (isPasswordMatch) {
        return done(null, true); //If the password matches, return true
      } else {
        return done(null, false, { message: "Invalid Password" }); //If the password does not match, return false
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport; //Export the passport module