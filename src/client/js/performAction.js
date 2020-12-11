/* Global Variables */

// Base URL for OpenWeatherMap API to optain current weather data by ZIP code
let baseURL = 'http://api.geonames.org/searchJSON?name_equals=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&lang=en&username=mohamedomar';

// Create a new date instance dynamically with JS
let month = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

let d = new Date();
let newDate = month[d.getMonth()] + '.' + d.getDate() + '.' + d.getFullYear();

/* Function called by event listener */
function performAction(e) {
  const departingDate = document.getElementById('departingDate').value;
  const cityName = document.getElementById('city').value;

  getWebData(baseURL, cityName, apiKey).then(function (data) {
    console.log('getWebData', data);
    postData('http://localhost:8081/geonamesData', {
      countryName: data.geonames[0].countryName,
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng,
      departingDate: departingDate,
    });
    updateUI();
  });
}

/* Function to GET Web API Data*/
const getWebData = async (baseURL, cityName, apiKey) => {
  const res = await fetch(baseURL + cityName + apiKey);
  try {
    const data = await res.json();
    console.log('getWebData', data);
    return data;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  console.log('postData', data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('http://localhost:8081/all');
  try {
    const allData = await request.json();
    document.getElementById(
      'countdown'
    ).innerHTML = `departingDate: ${allData.departingDate}`;
    document.getElementById(
      'weatherData'
    ).innerHTML = `countryName: ${allData.countryName}
    lat: ${allData.lat}
    lng: ${allData.lng}
    `;
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
