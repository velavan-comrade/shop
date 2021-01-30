const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  employeeName: String,
  age: Number,
  qualification: String,
  designation: String,
  salary: String,
  branch: String,
  dateCreated: Number,
});

module.exports = mongoose.model("Employee", employeeSchema); // JavaScript Document
