function countryInfo(countryName) {
  // Base URL for REST Countries API
  let RESTCountriesBaseURL = `https://restcountries.eu/rest/v2/name/${countryName}`;

  // fetch data from REST Countries API
  fetch(RESTCountriesBaseURL)
    .then((res) => res.json())
    .then(function (res) {

      // POST Country information to server
      postCountryInfoData('http://localhost:8081/countryInfo', {
        alpha3Code: res[0].alpha3Code,
        capital: res[0].capital,
        region: res[0].region,
        demonym: res[0].demonym,
        timezones: res[0].timezones,
        nativeName: res[0].nativeName,
        currenciesCode: res[0].currencies[0].code,
        currenciesName: res[0].currencies[0].name,
        currenciesSymbol: res[0].currencies[0].symbol,
        languagesName: res[0].languages[0].name,
        flag: res[0].flag,
      });
    });
}

/* Function to POST data */
const postCountryInfoData = async (url = '', data = {}) => {
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

export { countryInfo };
