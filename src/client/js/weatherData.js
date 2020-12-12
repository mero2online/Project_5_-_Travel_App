function weatherData() {
  fetch('http://localhost:8081/all')
    .then((data) => data.json())
    .then(function (data) {
      let lat = data.lat;
      let lon = data.lng;
      let days = data.days;

      let weatherbitAPIkey = '5bf765d1c8224a3a8eb3995c6c80c3a3';
      // Base URL for weatherbit API
      let weatherbitBaseURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherbitAPIkey}`;

      // fetch data from weatherbit API and print it to html file
      fetch(weatherbitBaseURL)
        .then((res) => res.json())
        .then(function (res) {
          console.log(res);

          document.getElementById('weatherData').innerHTML = `Weather Data:
          High Temp: ${res.data[days].max_temp} C
          Low Temp: ${res.data[days].min_temp} C
          Weather description: ${res.data[days - 1].weather.description}
          `;

          postWeatherData('http://localhost:8081/weatherData', {
            max_temp: res.data[days].max_temp,
            min_temp: res.data[days].min_temp,
            weather_description: res.data[days].weather.description,
          });
        });
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
