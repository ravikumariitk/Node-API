const mongoose = require('mongoose');

// Schema
const UserSchema = mongoose.Schema({
  user: String,
  password: String,
});

// Model
const User = mongoose.model('User', UserSchema, 'UserData');

module.exports = User;