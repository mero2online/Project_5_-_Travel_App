/* Global Variables */

// Base URL for OpenWeatherMap API to optain current weather data by ZIP code
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=7e3d290cd442823876bb07faec6a3a8e';

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
  const userResponse = document.getElementById('feelings').value;
  const zipCode = document.getElementById('zip').value;

  getWebData(baseURL, zipCode, apiKey).then(function (data) {
    console.log('getWebData', data);
    postData('http://localhost:8081/weatherData', {
      temperature: data.main.temp,
      date: newDate,
      userResponse: userResponse,
    });
    updateUI();
  });
}

/* Function to GET Web API Data*/
const getWebData = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL + zipCode + apiKey);
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
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById(
      'temp'
    ).innerHTML = `Temperature: ${allData.temperature} kelvin`;
    document.getElementById(
      'content'
    ).innerHTML = `Your feeling: ${allData.userResponse}`;
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
