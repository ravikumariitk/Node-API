const mongoose = require('mongoose');

// Schema
const StudentSchema = mongoose.Schema({
  Name: String,
  Roll_no: Number,
  Branch: String
});

// Model
const Student = mongoose.model('Student', StudentSchema, 'StudentData');

module.exports = Student;