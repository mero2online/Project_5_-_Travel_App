function imageData(cityName, countryName) {
  // Personal API Key for PixaBay API
  let pixabayAPIkey = process.env.PIXABAY_API_KEY;
  // Base URL for pixabay API
  let pixabayBaseURLcity = `https://pixabay.com/api/?key=${pixabayAPIkey}&q=${cityName}+travel&image_type=photo&pretty=true&safesearch=true`;
  let pixabayBaseURLcountry = `https://pixabay.com/api/?key=${pixabayAPIkey}&q=${countryName}+street&image_type=photo&pretty=true&safesearch=true`;

  Promise.all([
    fetch(pixabayBaseURLcity).then((res) => res.json()),
    fetch(pixabayBaseURLcountry).then((res) => res.json()),
  ]).then(function (res) {
    console.log('city', res[0]);
    console.log('country', res[1]);

    let cityTotalHits = res[0].totalHits;
    let countryTotalHits = res[1].totalHits;

    let cityWebformatURL;
    let countryWebformatURL;

    if (cityTotalHits > 0) {
      cityWebformatURL = res[0].hits[0].webformatURL;
    } else {
      cityWebformatURL = 0;
    }
    if (countryTotalHits > 0) {
      countryWebformatURL = res[1].hits[0].webformatURL;
    } else {
      countryWebformatURL = 0;
    }
    console.log('cityWebformatURL', cityWebformatURL);
    console.log('countryWebformatURL', countryWebformatURL);

    postImageData('http://localhost:8081/imageData', {
      cityTotalHits: cityTotalHits,
      cityWebformatURL: cityWebformatURL,
      countryTotalHits: countryTotalHits,
      countryWebformatURL: countryWebformatURL,
    });
  });
  // fetch data from pixabay API
  // fetch(pixabayBaseURL)
  //   .then((res) => res.json())
  //   .then(function (res) {
  //     console.log(res);

  //     if (res.totalHits > 0) {
  //       postImageData('http://localhost:8081/imageData', {
  //         totalHits: res.totalHits,
  //         webformatURL: res.hits[1].webformatURL,
  //       });
  //     } else {
  //       postImageData('http://localhost:8081/imageData', {
  //         totalHits: res.totalHits,
  //         webformatURL: 0,
  //       });
  //     }
  //   });
}

/* Function to POST data */
const postImageData = async (url = '', data = {}) => {
  console.log('postImageData', data);
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
      <p>Weather datetime: ${allData.datetime}</p>
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

export { imageData };
