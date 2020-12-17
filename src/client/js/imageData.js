function imageData(cityName, countryName) {
  // Personal API Key for PixaBay API
  let pixabayAPIkey = process.env.PIXABAY_API_KEY;
  // Base URL for pixabay API
  let pixabayBaseURLcity = `https://pixabay.com/api/?key=${pixabayAPIkey}&q=${cityName}+travel&image_type=photo&pretty=true&safesearch=true`;
  let pixabayBaseURLcountry = `https://pixabay.com/api/?key=${pixabayAPIkey}&q=${countryName}+city&image_type=photo&pretty=true&safesearch=true`;

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

    // Check images available for input city
    cityTotalHits > 0 // Ternary Operator
      ? (cityWebformatURL = res[0].hits[0].webformatURL)
      : (cityWebformatURL = 0);

    // Check images available for input country
    countryTotalHits > 0 // Ternary Operator
      ? (countryWebformatURL = res[1].hits[0].webformatURL)
      : (countryWebformatURL = 0);

    console.log('cityWebformatURL', cityWebformatURL);
    console.log('countryWebformatURL', countryWebformatURL);

    postImageData('http://localhost:8081/imageData', {
      cityTotalHits: cityTotalHits,
      cityWebformatURL: cityWebformatURL,
      countryTotalHits: countryTotalHits,
      countryWebformatURL: countryWebformatURL,
    });
  });
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

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

export { imageData };
