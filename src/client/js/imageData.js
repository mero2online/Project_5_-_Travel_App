function imageData(cityName, countryName) {
  // Personal API Key for PixaBay API
  let pixabayAPIkey = process.env.PIXABAY_API_KEY;
  // Base URL for pixabay API
  let pixabayBaseURLcity = `https://pixabay.com/api/?key=${pixabayAPIkey}&q=${cityName}+travel&image_type=photo&pretty=true&safesearch=true`;
  let pixabayBaseURLcountry = `https://pixabay.com/api/?key=${pixabayAPIkey}&q=${countryName}+city&image_type=photo&pretty=true&safesearch=true`;

  let imageData = {};
  // fetch city and country images from pixabay API
  Promise.all([
    fetch(pixabayBaseURLcity).then((res) => res.json()),
    fetch(pixabayBaseURLcountry).then((res) => res.json()),
  ]).then(function (res) {
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

    // POST image data to server

    (imageData['cityTotalHits'] = cityTotalHits),
      (imageData['cityWebformatURL'] = cityWebformatURL),
      (imageData['countryTotalHits'] = countryTotalHits),
      (imageData['countryWebformatURL'] = countryWebformatURL),
      console.log(imageData);
  });
  return imageData;
}

export { imageData };
