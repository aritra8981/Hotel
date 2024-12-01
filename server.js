const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000; //PORT number is set to 3000

//Import the router files
const personRoutes = require("./routes/personRoutes.js");
const menuItemRoutes = require("./routes/menuItemRoutes.js");
// const Person = require("./models/person.js");

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); //Pass the request to the next middleware function in the pipeline
};

app.use(logRequest); //Use the middleware function

app.use(passport.initialize()); //Initialize the passport

const localauthMiddleware = passport.authenticate("local", { session: false }); //Authenticate the user using the local strategy
app.get("/", localauthMiddleware, function (req, res) {
  res.send("Hello Everyone, Welcome to our Hotel");
});

//Use the router files
app.use("/person", personRoutes);
app.use("/menuitem", menuItemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
