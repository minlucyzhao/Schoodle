"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));


// ROUTE
app.get('/', (req, res) => {
  res.render("index");
});
app.post('/meeting', (req, res) => {
  const { from_time, date } = req.body
  console.log(from_time)
  console.log(toTime(from_time))
  console.log(date)
  console.log(toDate(date))
})
app.get('/meeting', (req, res) => {
  const { date, from_time } = req.body

  res.render('meet')
})
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

//function
function toDate(dateStr) {
  var from = dateStr.split("/")
  var f = [from[2], from[0], from[1]].join('-')


  return f
}
function toTime(time) {
  var hours = Number(time.match(/^(\d+)/)[1]);
  console.log(hours)
  var minutes = Number(time.match(/:(\d+)/)[1]);
  console.log(minutes)
  var AMPM = time.match(/\s(.*)$/)[1];
  console.log(AMPM)
  if (AMPM === "pm" && hours < 12) { hours = hours + 12 }
  if (AMPM === "am" && hours == 12) { hours = hours - 12 }
  var sHours = hours.toString();
  console.log(sHours)
  var sMinutes = minutes.toString();
  console.log(sMinutes)
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  return sHours + ":" + sMinutes
}