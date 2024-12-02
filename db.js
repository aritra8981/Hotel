const mongoose = require("mongoose");
require("dotenv").config();

//Define the mongoDB connection URL
 //const mongoURL = process.env.MONGODB_URL_LOCAL //hotels is the name of the database
const mongoURL = process.env.MONGODB_URL; //hotels is the name of the database

// console.log('mongoURL:', mongoURL);

//setup mongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsInsecure: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to mongoDB Server");
});

db.on("error", (err) => {
  console.log("Error in connecting to mongoDB Server", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Server Disconnected");
});

module.exports = db;
