// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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
const port = process.env.PORT || 8081;
const server = app.listen(port, listening);

function listening() {
  console.log(`server running on localhost: ${port}`);
  console.log(`http://localhost:${port}/`);
}

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

// POST Route geonames API Data
app.post('/allData', allData);

function allData(req, res) {
  let aData = req.body.allData;
  projectData['countryName'] = aData.geonamesData.countryName;
  projectData['lat'] = aData.geonamesData.lat;
  projectData['lng'] = aData.geonamesData.lng;
  projectData['startDate'] = aData.geonamesData.startDate;
  projectData['endDate'] = aData.geonamesData.endDate;
  projectData['cityName'] = aData.geonamesData.cityName;
  projectData['countDownDays'] = aData.geonamesData.countDownDays;
  projectData['lengthOfTrip'] = aData.geonamesData.lengthOfTrip;

  projectData['max_temp'] = aData.weatherData.max_temp;
  projectData['min_temp'] = aData.weatherData.min_temp;
  projectData['weather_description'] = aData.weatherData.weather_description;
  projectData['datetime'] = aData.weatherData.datetime;
  projectData['weatherIcon'] = aData.weatherData.weatherIcon;

  projectData['cityTotalHits'] = aData.imageData.cityTotalHits;
  projectData['cityWebformatURL'] = aData.imageData.cityWebformatURL;
  projectData['countryTotalHits'] = aData.imageData.countryTotalHits;
  projectData['countryWebformatURL'] = aData.imageData.countryWebformatURL;

  projectData['alpha3Code'] = aData.countryInfoData.alpha3Code;
  projectData['capital'] = aData.countryInfoData.capital;
  projectData['region'] = aData.countryInfoData.region;
  projectData['demonym'] = aData.countryInfoData.demonym;
  projectData['timezones'] = aData.countryInfoData.timezones;
  projectData['nativeName'] = aData.countryInfoData.nativeName;
  projectData['currenciesCode'] = aData.countryInfoData.currenciesCode;
  projectData['currenciesName'] = aData.countryInfoData.currenciesName;
  projectData['currenciesSymbol'] = aData.countryInfoData.currenciesSymbol;
  projectData['languagesName'] = aData.countryInfoData.languagesName;
  projectData['flag'] = aData.countryInfoData.flag;

  res.send(projectData);
  console.log('all projectData', projectData);
}

// POST Route for testing the server
app.post('/test', async (req, res) => {
  res.send(req.body);
});

module.exports = app;
