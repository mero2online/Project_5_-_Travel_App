// Setup empty JS object to act as endpoint for all routes
projectData = {};

var path = require('path');

// Require Express to run server and routes
const express = require('express');

const mockAPIResponse = require('./mockAPI.js');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

// Setup Server
const port = 8081;
const server = app.listen(port, listening);

function listening() {
  console.log(`server running on localhost: ${port}`);
  console.log(`http://localhost:${port}/`);
}

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

// GET Route
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
  console.log('get projectData', projectData);
}

// POST Route
app.post('/geonamesData', geonamesData);

function geonamesData(req, res) {
  let gData = req.body;
  projectData['countryName'] = gData.countryName;
  projectData['lat'] = gData.lat;
  projectData['lng'] = gData.lng;
  projectData['departingDate'] = gData.departingDate;

  res.send(projectData);
}

app.post('/countDownD', countDownD);

function countDownD(req, res) {
  let cData = req.body;
  projectData['days'] = cData.days;

  res.send(projectData);
}

app.post('/weatherData', weatherData);

function weatherData(req, res) {
  let wData = req.body;
  projectData['max_temp'] = wData.max_temp;
  projectData['min_temp'] = wData.min_temp;
  projectData['weather_description'] = wData.weather_description;
  projectData['datetime'] = wData.datetime;

  res.send(projectData);
  console.log('post projectData', projectData);
}
