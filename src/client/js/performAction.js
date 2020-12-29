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

  // Use countDown function to calculate countdown days to trip and calculate length of trip
  let countDownDays = Client.countDown(startDate, endDate)[0],
    lengthOfTrip = Client.countDown(startDate, endDate)[1];

  // fetch geonamesAPI to got Country name, Latitude, Longitude
  getWebData(geonamesBaseURL, geonamesAPIkey).then(function (data) {

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
    postData('/.netlify/functions/allData/geonamesData', {
      countryName: data.geonames[0].countryName,
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng,
      startDate: new Date(startDate).toLocaleDateString(),
      endDate: new Date(endDate).toLocaleDateString(),
      cityName: cityName,
      countDownDays: countDownDays,
      lengthOfTrip: lengthOfTrip,
    });
    // after all Update UI
    setTimeout(function () {
      updateUI();
    }, 1000);
  });
}

/* Function to GET Web API Data*/
const getWebData = async (geonamesBaseURL, geonamesAPIkey) => {
  const res = await fetch(geonamesBaseURL + geonamesAPIkey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
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
  const request = await fetch('/.netlify/functions/allData');
  try {
    document.querySelector('.info').style.display = 'block';

    const allData = await request.json();
    console.log('all project Data', allData);
    /* For input data */
    document.getElementById('inputData').innerHTML = `
    <p>Start Date: ${allData.startDate}</p>
    <p>End Date: ${allData.endDate}</p>
    <p>Destination: ${allData.cityName}, ${allData.countryName}</p>
    `;

    /* For length Of Trip */
    let lengthOfTripDiv = document.getElementById('lengthOfTrip');

    // Ternary Operator
    allData.lengthOfTrip === 1
      ? (lengthOfTripDiv.innerHTML = `<p>Length of trip: ${allData.lengthOfTrip} day</p>`)
      : allData.lengthOfTrip < 0
      ? (lengthOfTripDiv.innerHTML = '<p>EXPIRED</p>')
      : (lengthOfTripDiv.innerHTML = `<p>Length of trip: ${allData.lengthOfTrip} days</p>`);

    /* For countdown day/days */
    let countdownDiv = document.getElementById('countdown');

    // Ternary Operator
    allData.countDownDays === 1
      ? (countdownDiv.innerHTML = `<p>Countdown: ${allData.countDownDays} day away</p>`)
      : allData.countDownDays < 0
      ? (countdownDiv.innerHTML = '<p>EXPIRED</p>')
      : (countdownDiv.innerHTML = `<p>Countdown: ${allData.countDownDays} days away</p>`);

    /* For Weather forecasts data */
    let weatherDataDiv = document.getElementById('weatherData');

    // Ternary Operator
    allData.countDownDays <= 14
      ? (weatherDataDiv.innerHTML = `
      <div>
      <h3>Weather forecasts</h3>
      <p>Weather date: ${allData.datetime}</p>
      <p>High Temp: ${allData.max_temp} <sup>o</sup>C</p>
      <p>Low Temp: ${allData.min_temp} <sup>o</sup>C</p>
      <p>Weather description: ${allData.weather_description}</p>
      <div>
      <div><p>Weather icon:</p> <img src="https://www.weatherbit.io/static/img/icons/${allData.weatherIcon}.png" alt="Weather Icon">
      </div>`)
      : (weatherDataDiv.innerHTML = `Weather Data: No data available for this date`);

    /* For City and Country photos */
    let cityImageDiv = document.getElementById('cityImage');
    // Ternary Operator for City
    allData.cityTotalHits > 0
      ? (cityImageDiv.innerHTML = `<figure>
      <figcaption> City Photo </figcaption>
      <img src="${allData.cityWebformatURL}" alt="City Photo">
      </figure>`)
      : (cityImageDiv.innerHTML = 'No Photo available for this city');

    let countryImageDiv = document.getElementById('countryImage');
    // Ternary Operator for Country
    allData.countryTotalHits > 0
      ? (countryImageDiv.innerHTML = `<figure>
      <figcaption> Country Photo </figcaption>
      <img src="${allData.countryWebformatURL}" alt="Country Photo">
      </figure>`)
      : (countryImageDiv.innerHTML = 'No Photo available for this country');

    /* For country informations */
    document.getElementById('countryInfo').innerHTML = `
    <h3>Country Informations</h3>
    <table>
    <tr><td>Alpha 3Code:</td> <td>${allData.alpha3Code}</td></tr>
    <tr><td>Capital:</td> <td>${allData.capital}</td></tr>
    <tr><td>Region:</td> <td>${allData.region}</td></tr>
    <tr><td>Demonym:</td> <td>${allData.demonym}</td></tr>
    <tr><td>Timezones:</td> <td>${allData.timezones.toString().split(',').join(",<br/>")}</td></tr>
    <tr><td>Native Name:</td> <td>${allData.nativeName}</td></tr>
    <tr><td>Currencies Code:</td> <td>${allData.currenciesCode}</td></tr>
    <tr><td>Currencies Name:</td> <td>${allData.currenciesName}</td></tr>
    <tr><td>Currencies Symbol:</td> <td>${allData.currenciesSymbol}</td></tr>
    <tr><td>Languages Name:</td> <td>${allData.languagesName}</td></tr>
    <tr><td>Flag:</td> <td><img src="${allData.flag}" alt="City Photo"></td></tr>
    </table>
    `;

  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
