const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    employeeName: String,
    age: Number,
    Qualification: String,
    Designation:String ,
    Salary: String,
    Branch: String,
	Datecreated: Number
});

module.exports = mongoose.model("Employee", employeeSchema);// JavaScript Document