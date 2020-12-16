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

const dotenv = require('dotenv');
dotenv.config();

// Personal API Key for geonames
const geonamesAPIkey = process.env.GEONAMES_API_KEY;
// Personal API Key for weatherbit
const weatherbitAPIkey = process.env.WEATHERBIT_API_KEY;
// Personal API Key for pixabay
const pixabayAPIkey = process.env.PIXABAY_API_KEY;

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

// GET Route for all data
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
  console.log('get projectData', projectData);
}

// POST Route geonames API Data
app.post('/geonamesData', geonamesData);

function geonamesData(req, res) {
  let gData = req.body;
  projectData['countryName'] = gData.countryName;
  projectData['lat'] = gData.lat;
  projectData['lng'] = gData.lng;
  projectData['startDate'] = gData.startDate;
  projectData['endDate'] = gData.endDate;
  projectData['cityName'] = gData.cityName;
  projectData['countDownDays'] = gData.countDownDays;
  projectData['lengthOfTrip'] = gData.lengthOfTrip;

  res.send(projectData);
}

// POST Route weatherbit API Data
app.post('/weatherData', weatherData);

function weatherData(req, res) {
  let wData = req.body;
  projectData['max_temp'] = wData.max_temp;
  projectData['min_temp'] = wData.min_temp;
  projectData['weather_description'] = wData.weather_description;
  projectData['datetime'] = wData.datetime;
  projectData['weatherIcon'] = wData.weatherIcon;

  res.send(projectData);
  console.log('post projectData', projectData);
}

// POST Route pixabay API Data
app.post('/imageData', imageData);

function imageData(req, res) {
  let iData = req.body;
  projectData['cityTotalHits'] = iData.cityTotalHits;
  projectData['cityWebformatURL'] = iData.cityWebformatURL;
  projectData['countryTotalHits'] = iData.countryTotalHits;
  projectData['countryWebformatURL'] = iData.countryWebformatURL;

  res.send(projectData);
}

// POST Route countryInfo Data
app.post('/countryInfo', countryInfo);

function countryInfo(req, res) {
  let coData = req.body;
  projectData['alpha3Code'] = coData.alpha3Code;
  projectData['capital'] = coData.capital;
  projectData['region'] = coData.region;
  projectData['demonym'] = coData.demonym;
  projectData['timezones'] = coData.timezones;
  projectData['nativeName'] = coData.nativeName;
  projectData['currenciesCode'] = coData.currenciesCode;
  projectData['currenciesName'] = coData.currenciesName;
  projectData['currenciesSymbol'] = coData.currenciesSymbol;
  projectData['languagesName'] = coData.languagesName;
  projectData['flag'] = coData.flag;

  res.send(projectData);
}
