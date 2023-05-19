const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url);

const Student = require("./models/Student");

const studentRoutes = require('./routes/studentRoutes');

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/', studentRoutes);


const port = 3000; 
app.listen(port, () => {
  console.log("Server is running at {$port}");
});