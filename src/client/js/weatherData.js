function weatherData(lat, lon, countDownDays) {
  // Personal API Key for WeatherBit API
  let weatherbitAPIkey = process.env.WEATHERBIT_API_KEY;
  // Base URL for weatherbit API
  let weatherbitBaseURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherbitAPIkey}`;

  // fetch data from weatherbit API
  fetch(weatherbitBaseURL)
    .then((res) => res.json())
    .then(function (res) {

      // weatherbit API free account provide weather forecast for 16 days only
      let max_temp, min_temp, weather_description, datetime, weatherIcon;
      countDownDays <= 14 // Ternary Operator
        ? ((max_temp = res.data[countDownDays + 1].max_temp),
          (min_temp = res.data[countDownDays + 1].min_temp),
          (weather_description =
            res.data[countDownDays + 1].weather.description),
          (datetime = res.data[countDownDays + 1].datetime),
          (weatherIcon = res.data[countDownDays + 1].weather.icon))
        : (max_temp,
          min_temp,
          weather_description,
          datetime,
          (weatherIcon = 0));

      // POST Weather Data to server
      postWeatherData('/weatherData', {
        max_temp: max_temp,
        min_temp: min_temp,
        weather_description: weather_description,
        datetime: new Date(datetime).toLocaleDateString(),
        weatherIcon: weatherIcon,
      });
    });
}

/* Function to POST data */
const postWeatherData = async (url = '', data = {}) => {
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
