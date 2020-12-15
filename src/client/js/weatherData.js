function weatherData(lat, lon, countDownDays) {
  // Personal API Key for WeatherBit API
  let weatherbitAPIkey = process.env.WEATHERBIT_API_KEY;
  // Base URL for weatherbit API
  let weatherbitBaseURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherbitAPIkey}`;

  // fetch data from weatherbit API and print it to html file
  fetch(weatherbitBaseURL)
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);

      if (countDownDays <= 14) {
        postWeatherData('http://localhost:8081/weatherData', {
          max_temp: res.data[countDownDays + 1].max_temp,
          min_temp: res.data[countDownDays + 1].min_temp,
          weather_description: res.data[countDownDays + 1].weather.description,
          datetime: res.data[countDownDays + 1].datetime,
          weatherIcon: res.data[countDownDays + 1].weather.icon,
        });
      } else {
        postWeatherData('http://localhost:8081/weatherData', {
          max_temp: 0,
          min_temp: 0,
          weather_description: 0,
          datetime: 0,
          weatherIcon: 0,
        });
      }
      // updateUI();
      // setTimeout(updateUI, 100);
    });
}

/* Function to POST data */
const postWeatherData = async (url = '', data = {}) => {
  console.log('postWeatherData', data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // after postImageData Update UI
  updateUI();

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
    document.getElementById('inputData').innerHTML = `
    <p>Start Date: ${allData.startDate}</p>
    <p>End Date: ${allData.endDate}</p>
    <p>Country Name: ${allData.countryName}</p>
    <p>Latitude: ${allData.lat}</p>
    <p>Longitude: ${allData.lng}</p>
    `;

    document.getElementById(
      'lengthOfTrip'
    ).innerHTML = `<p>Length of trip: ${allData.lengthOfTrip} days</p>`;
    if (allData.lengthOfTrip === 1) {
      document.getElementById(
        'lengthOfTrip'
      ).innerHTML = `<p>Length of trip: ${allData.lengthOfTrip} day</p>`;
    }

    document.getElementById(
      'countdown'
    ).innerHTML = `<p>Countdown: ${allData.countDownDays} days</p>`;
    if (allData.countDownDays === 1) {
      document.getElementById(
        'countdown'
      ).innerHTML = `<p>Countdown: ${allData.countDownDays} day</p>`;
    } else if (allData.countDownDays < 0) {
      document.getElementById('countdown').innerHTML = '<p>EXPIRED</p>';
    }

    if (allData.countDownDays <= 14) {
      document.getElementById('weatherData').innerHTML = `Weather Data:
      <p>High Temp: ${allData.max_temp} <sup>o</sup>C</p>
      <p>Low Temp: ${allData.min_temp} <sup>o</sup>C</p>
      <p>Weather description: ${allData.weather_description}</p>
      <p>Weather date: ${allData.datetime}</p>
      <div><p>Weather icon:</p> <img src="https://www.weatherbit.io/static/img/icons/${allData.weatherIcon}.png" alt="Weather Icon"></div>
    `;
    } else {
      document.getElementById(
        'weatherData'
      ).innerHTML = `Weather Data: No data available for this date`;
    }

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

    document.getElementById('countryInfo').innerHTML = `<table>
    <tr><td>Alpha3Code:</td> <td>${allData.alpha3Code}</td></tr>
    <tr><td>Capital:</td> <td>${allData.capital}</td></tr>
    <tr><td>Region:</td> <td>${allData.region}</td></tr>
    <tr><td>Demonym:</td> <td>${allData.demonym}</td></tr>
    <tr><td>Timezones:</td> <td>${allData.timezones}</td></tr>
    <tr><td>NativeName:</td> <td>${allData.nativeName}</td></tr>
    <tr><td>CurrenciesCode:</td> <td>${allData.currenciesCode}</td></tr>
    <tr><td>CurrenciesName:</td> <td>${allData.currenciesName}</td></tr>
    <tr><td>CurrenciesSymbol:</td> <td>${allData.currenciesSymbol}</td></tr>
    <tr><td>LanguagesName:</td> <td>${allData.languagesName}</td></tr>
    <tr><td>Flag:</td> <td><img src="${allData.flag}" alt="City Photo"></td></tr>
    </table>
    `;

    console.log('allData', allData);
  } catch (error) {
    console.log('error', error);
  }
};

export { weatherData };
