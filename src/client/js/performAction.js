// Personal API Key for GeoNames API
const geonamesAPIkey = 'mohamedomar';

/* Function called by event listener */
function performAction(e) {
  event.preventDefault(e);
  const departingDate = document.getElementById('departingDate').value;
  const cityName = document.getElementById('city').value;

  // Base URL for GeoNames API
  let geonamesBaseURL = `http://api.geonames.org/searchJSON?name_equals=${cityName}&lang=en&username=`;

  getWebData(geonamesBaseURL, geonamesAPIkey).then(function (data) {
    console.log('getWebData', data);
    postData('http://localhost:8081/geonamesData', {
      countryName: data.geonames[0].countryName,
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng,
      departingDate: departingDate,
    });
    Client.countDown();
    Client.weatherData();
    updateUI();
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
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
