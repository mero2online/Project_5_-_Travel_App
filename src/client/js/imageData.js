function imageData(cityName) {
  let cName = cityName;

  let pixabayAPIkey = '19500852-4a57ebc5b443428d25ca29bf5';
  // Base URL for pixabay API
  let pixabayBaseURL = `https://pixabay.com/api/?key=${pixabayAPIkey}&q=${cName}+city&image_type=photo&pretty=true`;

  // fetch data from pixabay API
  fetch(pixabayBaseURL)
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);

      postImageData('http://localhost:8081/imageData', {
        totalHits: res.totalHits,
        webformatURL: res.hits[1].webformatURL,
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
