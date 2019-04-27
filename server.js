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
const axios = require('axios');

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


//POSTing form on index.ejs
app.post('/db', (req, res) => {
  const event_title = req.body.title;
  const event_description = req.body.description;
  const event_date = toDate(req.body.date);
  const event_from_time = toTime(req.body['from_time']);
  const event_to_time = toTime(req.body['to_time']);
  const user_name = req.body.name;
  const user_email = req.body.email;

    knex('events')
    .insert([
      {title: event_title, description: event_description}
    ],
      ['title', 'id'])
    .then((results) => {
      console.log('first test');
      const returnedID = results[0].id;
      return knex('dates')
      .insert([
        {event_id: returnedID}])
    })
    .then(() => {
      console.log('testing log');
      return knex('users')
      .insert([
      {name: user_name, email: user_email}
      ])
      })
      res.redirect("/");
});


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

//LUCY ADDED HERE//

// POST request and takes string and converts into latitude and longitude
// Saves event_id, user_id, address, latitude, longitude into Locations Table

// GET request, query the Location Table based on event_id and user_id
//returns the latitude and longitude

// ROUTE MAP
app.get('/map', (req,res) => {
  res.render("map");
});

app.post('/map', (req,res) => {
  // console.log("hello");
  console.log(req.body.address);
  let codeArray = geocode(req.body.address, function(mapData) {

  const address = mapData[0];
  const latitude = mapData[1];
  const longitude = mapData[2];
  // console.log("yes, it worked!")
  // console.log('longitude', longitude);
  // const event_id;
  // const user_id = 123; //fix later once integrate with form

  // console.log(userAddress);
  knex('locations')
    .insert({
      address: address, 
      longitude: longitude,
      latitude: latitude,
    }, ['address', 'longitude', 'latitude'])
      .then((results) => {
        console.log('address', address)
        console.log('latitude', latitude)
        console.log('longitude', longitude)
      })
  // res.render("map");
  });
});


  function geocode(location, callback) {
    let codeArray = [];
    // let location = '22 Main st Boston MA';
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: {
      address: location,
      key:'AIzaSyDbhjMMS01YtWCehERYTwe912Q_2YNJuxI'
      }
    })
    .then(function(response){
      let formattedAddress = response.data.results[0].formatted_address;
      codeArray.push(formattedAddress);
      let latitude = response.data.results[0].geometry.location.lat;
      codeArray.push(latitude);
      let longitude = response.data.results[0].geometry.location.lng;
      codeArray.push(longitude);
      // console.log("<<<<<<<<<<<<<<<<<", codeArray);
      // console.log('codeArray', codeArray);
      // console.log('formattedAddress', formattedAddress);
      // console.log('latitude', latitude);
      // console.log('longitude', longitude);
      callback(codeArray);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

