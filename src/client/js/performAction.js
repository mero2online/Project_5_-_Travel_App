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
    document.querySelector('.info').style.display = 'block';

    const allData = await request.json();

    // For input data
    document.getElementById('inputData').innerHTML = `
    <p>Start Date: ${allData.startDate}</p>
    <p>End Date: ${allData.endDate}</p>
    <p>Destination: ${allData.cityName}, ${allData.countryName}</p>
    `;

    // For length Of Trip
    document.getElementById(
      'lengthOfTrip'
    ).innerHTML = `<p>Length of trip: ${allData.lengthOfTrip} days</p>`;
    if (allData.lengthOfTrip === 1) {
      document.getElementById(
        'lengthOfTrip'
      ).innerHTML = `<p>Length of trip: ${allData.lengthOfTrip} day</p>`;
    }

    // For countdown day/days
    document.getElementById(
      'countdown'
    ).innerHTML = `<p>Countdown: ${allData.countDownDays} days away</p>`;
    if (allData.countDownDays === 1) {
      document.getElementById(
        'countdown'
      ).innerHTML = `<p>Countdown: ${allData.countDownDays} day away</p>`;
    } else if (allData.countDownDays < 0) {
      document.getElementById('countdown').innerHTML = '<p>EXPIRED</p>';
    }

    // For Weather forecasts data
    if (allData.countDownDays <= 14) {
      document.getElementById('weatherData').innerHTML = `<div>
      <h3>Weather forecasts</h3>
      <p>Weather date: ${allData.datetime}</p>
      <p>High Temp: ${allData.max_temp} <sup>o</sup>C</p>
      <p>Low Temp: ${allData.min_temp} <sup>o</sup>C</p>
      <p>Weather description: ${allData.weather_description}</p>
      <div>
      <div><p>Weather icon:</p> <img src="https://www.weatherbit.io/static/img/icons/${allData.weatherIcon}.png" alt="Weather Icon"></div>
    `;
    } else {
      document.getElementById(
        'weatherData'
      ).innerHTML = `Weather Data: No data available for this date`;
    }

    // For City and Country photos
    if (allData.cityTotalHits > 0) {
      document.getElementById('cityImage').innerHTML = `<figure>
      <figcaption> City Photo </figcaption>
      <img src="${allData.cityWebformatURL}" alt="City Photo">
      </figure>`;
    } else {
      document.getElementById('cityImage').innerHTML =
        'No Photo available for this city';
    }

    if (allData.countryTotalHits > 0) {
      document.getElementById('countryImage').innerHTML = `<figure>
      <figcaption> Country Photo </figcaption>
      <img src="${allData.countryWebformatURL}" alt="Country Photo">
      </figure>`;
    } else {
      document.getElementById('countryImage').innerHTML =
        'No Photo available for this country';
    }

    // For country informations
    document.getElementById('countryInfo').innerHTML = `
    <h3>Country Informations</h3>
    <table>
    <tr><td>Alpha 3Code:</td> <td>${allData.alpha3Code}</td></tr>
    <tr><td>Capital:</td> <td>${allData.capital}</td></tr>
    <tr><td>Region:</td> <td>${allData.region}</td></tr>
    <tr><td>Demonym:</td> <td>${allData.demonym}</td></tr>
    <tr><td>Timezones:</td> <td>${allData.timezones}</td></tr>
    <tr><td>Native Name:</td> <td>${allData.nativeName}</td></tr>
    <tr><td>Currencies Code:</td> <td>${allData.currenciesCode}</td></tr>
    <tr><td>Currencies Name:</td> <td>${allData.currenciesName}</td></tr>
    <tr><td>Currencies Symbol:</td> <td>${allData.currenciesSymbol}</td></tr>
    <tr><td>Languages Name:</td> <td>${allData.languagesName}</td></tr>
    <tr><td>Flag:</td> <td><img src="${allData.flag}" alt="City Photo"></td></tr>
    </table>
    `;

    console.log('allData', allData);
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
