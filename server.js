const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3000; //PORT number is set to 3000

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello Everyone, Welcome to our Hotel");
});

//Import the router files
const personRoutes = require("./routes/personRoutes.js");
const menuItemRoutes = require("./routes/menuItemRoutes.js");

//Use the router files
app.use("/person", personRoutes);
app.use("/menuitem", menuItemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
