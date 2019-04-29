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
const axios = require('axios');
var moment = require('moment');

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

// ROUTE MAP
app.get('/map', (req, res) => {
  res.render("map");
});

//POSTing form on index.ejs
app.post('/db', (req, res) => {
  const event_title = req.body.title;
  const event_description = req.body.description;
  const event_from_time = req.body['from_time'].filter((iterm) => { return iterm !== '' });
  const event_to_time = req.body['to_time'].filter((iterm) => { return iterm !== '' });
  const event_date = req.body['date'].filter((iterm) => { return iterm !== '' });
  const user_name = req.body.name;
  const user_email = req.body.email;

  console.log("event from time:", event_from_time);
  console.log("event to time", event_to_time);
  console.log("event date", event_date);
  ////functions
  function getDates(date, time1, time2, eventID) {
    let q = []
    for (let i = 0; i < date.length; i++) {
      q.push({
        event_id: eventID, from_time: time1[i], to_time: time2[i], day: date[i]
      })
    }
    return q
  }
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
      console.log('date we have is', getDates(event_date, event_from_time, event_to_time, returnedID))
      return knex('dates')
        .insert(getDates(event_date, event_from_time, event_to_time, returnedID))
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
  const url = `localhost8080/${req.session.eventID}`
  console.log('url is', url)
  res.render('success', { url: url })
})

app.get('/:hash', (req, res) => {
  const event = hashids.decode(req.params.hash)[0];
  const hash = req.params.hash;
  // let src = randomSRC();
  knex.select('day', 'from_time', 'to_time').from('dates').where('event_id', event).then(function (result) {
    let date = []
    let timef = []
    let timet = []
    result.forEach(item => {
      let newday = new Date(item.day)
      date.push(dateGet(newday))
      let newtimef = item.from_time
      timef.push(newtimef[0] + newtimef[1] + newtimef[2] + newtimef[3] + newtimef[4])
      let newtimet = item.to_time
      timet.push(newtimet[0] + newtimet[1] + newtimet[2] + newtimet[3] + newtimef[4])
      console.log(timef, timet)
    })
    res.render('meet', { day: date, timef: timef, timet: timet, eventID: event, hash: hash, db: localDB, src: randomSRC() })
  })
})
app.post('/:hash/update', (req, res) => {
  const { time, name, location } = req.body
  const hash = req.body.params
  console.log('servise side time is', time)
  console.log('servise side name is', name)
  console.log('servise side locaiton is', location)
  localDB.push({
    time: time,
    name: name,
    location: location
  })
  console.log(localDB)
  console.log(hash)
  res.redirect(`${hash}`)
})
app.get('/ndb', (req, res) => {
  res.json(localDB)
  res.send(localDB)
})


//---------------------------------------------
//GET EXISTING MAP PINS
//---------------------------------------------
app.get('/map/position', (req, res) => {
  console.log("hello from app.get request");
  const event = 1;
  // let pins = [];
  knex('locations')
    .join('users', 'users.id', 'locations.user_id')
    .select('name', 'address', 'latitude', 'longitude')
    .where('event_id', event)
    .then(function (result) {
      console.log('result app.get(map)', result);
      // pins.push({longitude:'longitude',latitude:'latitude', user_id:'user_id'});
      // console.log('pins', pins);
      // return pins;
      res.json(result);
    })
})
//---------------------------------------------


//---------------------------------------------
//CALCULATE CENTER OF PINS
//---------------------------------------------
function calculateCenter(pins) {
  //let longitudeCenter = (max(longitude) - min(longitude)) / 2;
  //let latitudeCenter = (max(latitude) - min(latitude) / 2;
  //addMarker({ lat: latitudeCenter, lng: longitudeCenter }); 
}
//---------------------------------------------

//function to convert date to proper format for psql
//LUCY ADDED HERE//

// POST request and takes string and converts into latitude and longitude
// Saves event_id, user_id, address, latitude, longitude into Locations Table

// GET request, query the Location Table based on event_id and user_id
//returns the latitude and longitude

app.post('/map', (req, res) => {
  console.log("hello");
  console.log(req.body.address);
  // const event = hashids.decode(req.params.hash)[0];
  let codeArray = geocode(req.body.address, function (mapData) {
    // ROUTE MAP

    // app.post('/:hash', (req, res) => {
    //   const event = hashids.decode(req.params.hash)[0];
    //   const { location, name } = req.body;
    // console.log("hello");
    // console.log(req.body.address);
    // let codeArray = geocode(location, function (mapData) {

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
        user_id: 3, //NEED TO FIX
        event_id: 1 //NEED TO FIX
      }, ['address', 'longitude', 'latitude', 'user_id', 'event_id'])
      .then((results) => {
        console.log('address', address)
        console.log('latitude', latitude)
        console.log('longitude', longitude)
      })
    res.json({ "success": 0 });
  });
});


function geocode(location, callback) {
  let codeArray = [];
  // let location = '22 Main st Boston MA';
  axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
    params: {
      address: location,
      key: 'AIzaSyDbhjMMS01YtWCehERYTwe912Q_2YNJuxI'
    }
  })
    .then(function (response) {
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
    .catch(function (error) {
      console.log(error);
    });
}
//////Date function
function dateGet(today) {
  let dd = today.getDate();
  let mm = today.getMonth()
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  let month = [];
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  return `${month[mm]} ${dd} ${yyyy}`
}
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

let list = ['https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=BlazerSweater&clotheColor=Gray02&eyeType=Close&eyebrowType=Default&mouthType=Grimace&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Prescription01&hatColor=Blue03&hairColor=SilverGray&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=PastelBlue&graphicType=Diamond&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Round&hatColor=Blue03&hairColor=Blonde&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=Pink&graphicType=Cumbia&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Prescription02&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=CollarSweater&clotheColor=White&eyeType=EyeRoll&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Black',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Kurt&hairColor=BlondeGolden&facialHairType=MoustacheFancy&facialHairColor=Red&clotheType=Hoodie&clotheColor=PastelYellow&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=DarkBrown']

const localDB = [
  {
    time: [1, 2],
    name: 'yiyao',
    avatar: list[0]
  },
  {
    time: [0, 2],
    name: 'Lucy',
    avatar: list[3]
  },
  {
    time: [1],
    name: 'Shivangna',
    avatar: list[4]
  }
]
function randomSRC() {
  let list = ['https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=BlazerSweater&clotheColor=Gray02&eyeType=Close&eyebrowType=Default&mouthType=Grimace&skinColor=DarkBrown',
    'https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Prescription01&hatColor=Blue03&hairColor=SilverGray&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=PastelBlue&graphicType=Diamond&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Brown',
    'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Round&hatColor=Blue03&hairColor=Blonde&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=Pink&graphicType=Cumbia&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=Light',
    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Prescription02&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=CollarSweater&clotheColor=White&eyeType=EyeRoll&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Black',
    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Kurt&hairColor=BlondeGolden&facialHairType=MoustacheFancy&facialHairColor=Red&clotheType=Hoodie&clotheColor=PastelYellow&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=DarkBrown'

  ]
  return list[Math.floor(Math.random() * 5)]
}
