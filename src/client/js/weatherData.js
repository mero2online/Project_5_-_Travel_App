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

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

export { weatherData };
