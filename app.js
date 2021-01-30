const express = require("express");
const app = express();
const morgan = require("morgan");
const bodypraser = require("body-parser");
const mongoose = require("mongoose");
const emproutes = require("./api/routes/employee");
mongoose.connect("mongodb://localhost:27017/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// console.log("databases created");
app.use(bodypraser.urlencoded({ extended: false }));
app.use(bodypraser.json());

app.use(morgan("dev"));
app.use("/employee", emproutes);

module.exports = app;
