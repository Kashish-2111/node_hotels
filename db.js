const mongoose = require("mongoose");
require("dotenv").config();

//mongoose maintain a defined connection object for interaction and connection to any database

//define the mongoDB connection url

//const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //mongodb://localhost:27017/hotels yeh likhne pr nhi chl rha hhh error aari hh
//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL= process.env.MONGODB_URL;

//setup connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true, //these are mandatory parameters to pass for establishing connection .
  useUnifiedTopology: true,
});

//default connection
const db = mongoose.connection; //object to handle events and interact with the database.

//event listeners to react to different states of the database connection
db.on("connected", () => {
  console.log("connected to mongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDb connection error:", err);
});

db.on("disconnected", () => {
  console.log("disconnected from mongoDB server");
});

//export the database connection

module.exports = db;
