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

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

export { imageData };
