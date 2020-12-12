/* Global Variables */

// Base URL for OpenWeatherMap API to optain current weather data by ZIP code
let baseURL = 'http://api.geonames.org/searchJSON?name_equals=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&lang=en&username=mohamedomar';

/* Function called by event listener */
function performAction(e) {
  event.preventDefault(e);
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
    Client.countDown();
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
    document.getElementById('weatherData').innerHTML = `
    departingDate: ${allData.departingDate}
    countryName: ${allData.countryName}
    lat: ${allData.lat}
    lng: ${allData.lng}
    days: ${allData.days}
    `;
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
