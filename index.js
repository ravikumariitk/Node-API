const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser());
'use strict';
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require('body-parser');
const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url);
const jwt = require('jsonwebtoken');
const Student = require("./models/Student");
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

// Middleware to parse JSON bodies
app.use(bodyParser.json()); 

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/', studentRoutes);
app.use('/', userRoutes);

const port = process.env.PORT; 
app.listen(port, () => {
  console.log("Server is running at", port);
});