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
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
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
app.get('/all', getData)

function getData(req, res) {
    res.send(projectData)
    console.log('get projectData', projectData)
}

// POST Route
app.post('/weatherData', weatherData);

function weatherData(req, res) {
    console.log('post req.body', req.body)
    let wData = req.body;
    projectData["countryName"] = wData.countryName
    projectData["lat"] = wData.lat
    projectData["lng"] = wData.lng
    projectData["departingDate"] = wData.departingDate

    res.send(projectData)
    console.log('post projectData', projectData)
}