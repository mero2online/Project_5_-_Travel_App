/* Function called by event listener */
function performAction(e) {
  event.preventDefault(e);
  console.log('::: Form Submitted :::');
  let startDate = document.getElementById('startDate').value;
  let endDate = document.getElementById('endDate').value;
  const cityName = document.getElementById('city').value;

  // Personal API Key for GeoNames API
  const geonamesAPIkey = process.env.GEONAMES_API_KEY;
  // Base URL for GeoNames API
  let geonamesBaseURL = `http://api.geonames.org/searchJSON?name_equals=${cityName}&lang=en&username=`;

  // Execute countDown function to calculate countdown days to trip and calculate length of trip
  Client.countDown(startDate, endDate);
  let countDownDays = Client.countDown(startDate, endDate);

  // fetch geonamesAPI to got Country name, Latitude, Longitude
  getWebData(geonamesBaseURL, geonamesAPIkey).then(function (data) {
    console.log('getWebData', data);

    let countryName = data.geonames[0].countryName;

    // Execute countryInfo function to got Countries data
    Client.countryInfo(countryName);

    // Execute imageData function to got city photo and country photo
    Client.imageData(cityName, countryName);

    let lat = data.geonames[0].lat;
    let lon = data.geonames[0].lng;

    // Execute weatherData function to got Weather forecasts for the city
    Client.weatherData(lat, lon, countDownDays);

    // POST geonames API Data, start and end date to server
    postData('http://localhost:8081/geonamesData', {
      countryName: data.geonames[0].countryName,
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng,
      startDate: startDate,
      endDate: endDate,
    });
  });
}

/* Function to GET Web API Data*/
const getWebData = async (geonamesBaseURL, geonamesAPIkey) => {
  const res = await fetch(geonamesBaseURL + geonamesAPIkey);
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

export { performAction };
