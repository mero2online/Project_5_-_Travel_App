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
        });
      } else {
        postWeatherData('http://localhost:8081/weatherData', {
          max_temp: 0,
          min_temp: 0,
          weather_description: 0,
          datetime: 0,
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

  // after postWeatherData Update UI
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
    const allData = await request.json();
    document.getElementById('inputData').innerHTML = `
    startDate: ${allData.startDate}
    countryName: ${allData.countryName}
    lat: ${allData.lat}
    lng: ${allData.lng}
    `;

    document.getElementById('lengthOfTrip').innerHTML = `Length of trip: ${allData.lengthOfTrip} days`;
    if (allData.lengthOfTrip === 1) {
      document.getElementById('lengthOfTrip').innerHTML = `Length of trip: ${allData.lengthOfTrip} day`;
    }

    document.getElementById('countdown').innerHTML = `Countdown: ${allData.countDownDays} days`;
    if (allData.countDownDays === 1) {
      document.getElementById('countdown').innerHTML = `Countdown: ${allData.countDownDays} day`;
    } else if (allData.countDownDays < 0) {
      document.getElementById('countdown').innerHTML = 'EXPIRED';
    }

    if (allData.countDownDays <= 14) {
      document.getElementById('weatherData').innerHTML = `Weather Data:
    High Temp: ${allData.max_temp} <sup>o</sup>C
    Low Temp: ${allData.min_temp} <sup>o</sup>C
    Weather description: ${allData.weather_description}
    Weather datetime: ${allData.datetime}
    `;
    } else {
      document.getElementById(
        'weatherData'
      ).innerHTML = `Weather Data: No data available for this date`;
    }

    if (allData.totalHits > 0) {
      document.getElementById(
        'cityImage'
      ).innerHTML = `<img src="${allData.webformatURL}" alt="City Photo">`;
    } else {
      document.getElementById('cityImage').innerHTML =
        'No Photo available for this city';
    }

    console.log('allData', allData);
  } catch (error) {
    console.log('error', error);
  }
};

export { weatherData };
