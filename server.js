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
var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['eventID', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))
var Hashids = require('hashids');
var hashids = new Hashids('', 10);

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

  const event_from_time = req.body['from_time'];
  const event_to_time = req.body['to_time'];
  const event_date = req.body['date'];
  const user_name = req.body.name;
  const user_email = req.body.email;

  console.log("event from time:", event_from_time);
  console.log("event to time", event_to_time);
  console.log("event date", event_date);

  knex('events')
    .insert([
      { title: event_title, description: event_description }
    ],
      ['title', 'id'])
    .then((results) => {
      console.log('first test');
      const returnedID = results[0].id;
      req.session.eventID = hashids.encode(returnedID);
      console.log(req.session)
      console.log('event_id is', returnedID)
      console.log('cookie is', req.session.eventID)
      return knex('dates')
      ert([
        { event_id: returnedID, from_time: event_from_time, to_time: event_to_time, day: toDate(event_date) }])

    })
    .then(() => {
      console.log('testing log');
      return knex('users')
        .insert([
          { name: user_name, email: user_email }
        ])
    })
    .then(() => { res.redirect("/success"); })

});

app.get('/success', (req, res) => {
  const url = `localhost8081/${req.session.eventID}`
  console.log('url is', url)
  res.render('success', { url: url })
})
app.get('/:hash', (req, res) => {
  const event = hashids.decode(req.params.hash)
  console.log('event', event)
  res.render('meet', { event: event })
})

//function
// function toDate(dateStr) {
//   var from = dateStr.split("/")
//   var f = [from[2], from[0], from[1]].join('-')


//   return f
// }
// function toTime(time) {
//   var hours = Number(time.match(/^(\d+)/)[1]);
//   console.log(hours)
//   var minutes = Number(time.match(/:(\d+)/)[1]);
//   console.log(minutes)
//   var AMPM = time.match(/\s(.*)$/)[1];
//   console.log(AMPM)
//   if (AMPM === "pm" && hours < 12) { hours = hours + 12 }
//   if (AMPM === "am" && hours == 12) { hours = hours - 12 }
//   var sHours = hours.toString();
//   console.log(sHours)
//   var sMinutes = minutes.toString();
//   console.log(sMinutes)
//   if (hours < 10) sHours = "0" + sHours;
//   if (minutes < 10) sMinutes = "0" + sMinutes;
//   return sHours + ":" + sMinutes
// }


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



//function to convert date to proper format for psql
function toDate(dateStr) {
  var from = dateStr.split("/")
  var f = [from[2], from[0], from[1]].join('-')
  return f
}



