const mongoose = require('mongoose');

// Schema
const UserSchema = mongoose.Schema({
  user: String,
  password: String,
  session_token:String
});

// Model
const User = mongoose.model('User', UserSchema, 'UserData');

module.exports = User;