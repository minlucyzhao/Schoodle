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

// Home page


//FAKE DB
const DB = [{
  id: 1,
  title: 'light house meeting',
  description: '',
  timeManage: [{
    date: 'April 30',
    time_range: '1:30 - 2:30',
  }, {
    date: 'April 31',
    time_range: '2:30 - 3:30'
  },
  {
    date: 'April 32',
    time_range: '4:30 - 5:30'
  }],
  name: 'YIYAO',
  email: 'a@example.com'
}, {
  id: 2,
  title: 'light house meeting2',
  description: '',
  timeManage: [{
    date: 'April 1',
    time_range: '1:30 - 2:30',
  }, {
    date: 'April 2',
    time_range: '2:30 - 3:30'
  },
  {
    date: 'April 3',
    time_range: '4:30 - 5:30'
  }],
  name: 'LUCY',
  email: 'b@example.com'
}]
//function

// ROUTE
app.get("/", (req, res) => {
  res.render("index");
});
app.post('/db', (req, res) => {
  const { title, description, date, from_time, to_time, name, email } = req.body
  DB.push({
    id: DB.length + 1,
    title: title,
    description: description,
    date: date,
    name: name,
    email: email

  })

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

