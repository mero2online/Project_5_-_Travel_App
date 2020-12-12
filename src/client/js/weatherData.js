function weatherData(lat, lon, days) {
  // fetch('http://localhost:8081/all')
  //   .then((data) => data.json())
  //   .then(function (data) {
  //     let lat = data.lat;
  //     let lon = data.lng;
  //     let days = data.days;

  let weatherbitAPIkey = '5bf765d1c8224a3a8eb3995c6c80c3a3';
  // Base URL for weatherbit API
  let weatherbitBaseURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherbitAPIkey}`;

  // fetch data from weatherbit API and print it to html file
  fetch(weatherbitBaseURL)
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);

      // document.getElementById('weatherData').innerHTML = `Weather Data:
      //   High Temp: ${res.data[days + 1].max_temp} C
      //   Low Temp: ${res.data[days + 1].min_temp} C
      //   Weather description: ${res.data[days + 1].weather.description}
      //   Weather datetime: ${res.data[days + 1].datetime}
      //   `;

      postWeatherData('http://localhost:8081/weatherData', {
        max_temp: res.data[days + 1].max_temp,
        min_temp: res.data[days + 1].min_temp,
        weather_description: res.data[days + 1].weather.description,
        datetime: res.data[days + 1].datetime,
      });
      updateUI();
    });
  // });
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

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('http://localhost:8081/all');
  try {
    const allData = await request.json();
    document.getElementById('inputData').innerHTML = `
    departingDate: ${allData.departingDate}
    countryName: ${allData.countryName}
    lat: ${allData.lat}
    lng: ${allData.lng}
    `;

    document.getElementById('countdown').innerHTML = `${allData.days} days`;
    if (allData.days === 1) {
      document.getElementById('countdown').innerHTML = `${allData.days} day`;
    } else if (allData.days < 0) {
      document.getElementById('countdown').innerHTML = 'EXPIRED';
    }
    
    document.getElementById('weatherData').innerHTML = `Weather Data:
    High Temp: ${allData.max_temp} C
    Low Temp: ${allData.min_temp} C
    Weather description: ${allData.weather_description}
    Weather datetime: ${allData.datetime}
    `;

    if (allData.totalHits > 1) {
      document.getElementById('cityImage').innerHTML = `<img src="${allData.webformatURL}" alt="City Photo">`;
    } else {
      document.getElementById('cityImage').innerHTML = 'No Photo available for this city';
    }

    console.log('allData', allData);
  } catch (error) {
    console.log('error', error);
  }
};

export { weatherData };
