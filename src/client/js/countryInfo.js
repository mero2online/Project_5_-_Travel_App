function countryInfo(countryName) {
  // Base URL for REST Countries API
  let RESTCountriesBaseURL = `https://restcountries.eu/rest/v2/name/${countryName}`;

  let countryInfoData = {};
  // fetch data from REST Countries API
  fetch(RESTCountriesBaseURL)
    .then((res) => res.json())
    .then(function (res) {
      (countryInfoData['alpha3Code'] = res[0].alpha3Code),
        (countryInfoData['capital'] = res[0].capital),
        (countryInfoData['region'] = res[0].region),
        (countryInfoData['demonym'] = res[0].demonym),
        (countryInfoData['timezones'] = res[0].timezones),
        (countryInfoData['nativeName'] = res[0].nativeName),
        (countryInfoData['currenciesCode'] = res[0].currencies[0].code),
        (countryInfoData['currenciesName'] = res[0].currencies[0].name),
        (countryInfoData['currenciesSymbol'] = res[0].currencies[0].symbol),
        (countryInfoData['languagesName'] = res[0].languages[0].name),
        (countryInfoData['flag'] = res[0].flag),
        console.log(countryInfoData);
    });
  return countryInfoData;
}

export { countryInfo };
