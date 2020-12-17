# Travel App Project

## Main Object

This project is to build a travel application to pull data from **_Web APIs_** from different sources and some API will be required to get data from another API.

The project include a simple form where you enter the location you are traveling to, the date you are leaving and the end date, then you will get this information:

1. How many days until travel.
2. Length of travel.
3. Weather forecasts for the city you travel to it.
4. City image and also country too.
5. Information about country you will visit.

## Objects

1. Create clean and appealing HTML/CSS.
2. Manipulate the DOM.
3. Working with objects.
4. Retrieving data from 3 APIs or more and which one of those is reliant on another to work.
5. Using Webpack environment and express server.
6. Using service workers.

## Dependencies

#### 1. General Dependencies

```
express
body-parser
cors
webpack
webpack-cli
core-js
regenerator-runtime
```

#### 2. Wepback Dependencies

```
@babel/core
@babel/preset-env
babel-loader
clean-webpack-plugin
css-loader
dotenv-flow-webpack
dotenv-webpack
html-webpack-plugin
jest
mini-css-extract-plugin
node-sass
optimize-css-assets-webpack-plugin
sass-loader
style-loader
terser-webpack-plugin
webpack-dev-server
webpack-merge
workbox-webpack-plugin
dotenv
```

#### APIs

1. Geonames API
   - Get city coordinates and country name.
2. Weatherbit API
   - Get weather forecasts for the city by its coordinates.
3. Pixabay API
   - Get city and country images by names.
4. REST Countries API
   - Get information about countries via a RESTful API.

#### Project Extended

This options implemented to the project to extend it

1. Add end date and display length of trip.
2. Pull in an image for the country from Pixabay API when the entered location brings up no results.
3. Integrate the REST Countries API to pull in data for the country being visited.
4. Allow the user to remove the trip.
5. Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
6. Incorporate icons into forecast.
7. Allow user to Print their trip.

#### Service Workers
The project have service workers installed.

#### Test issue fixed

While testing functions the async function showing this error
`referenceerror: regeneratorruntime is not defined`
To fix this issue install

```
npm install --save core-js
npm install --save regenerator-runtime
```

then add this to the top of your test file

```
import "core-js/stable";
import "regenerator-runtime/runtime";
```
## To run project Locally
- [ ] Create a new ```.env``` file in the root of project
- [ ] Fill the .env file with your API keys like this:
```
GEONAMES_API_KEY=**************************
WEATHERBIT_API_KEY=*******************************
PIXABAY_API_KEY=********-********************************
```
- [ ] Start run the project
```
npm run buildstart
```
## Deployment
I have deploy this project to be live on [Netlify](https://www.netlify.com/)
To access it live [Click Here](https://travel-app-mohamed-omar.netlify.app/)

---

### License

Travel App Project is Copyright © 2020 Udaciy.
It is open source project, and redistributed under the terms specified in the
[LICENSE] file.

[license]: https://github.com/mero2online/Project_5_-_Travel_App/blob/master/LICENSE
