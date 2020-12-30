let projectData = {};

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  console.log('body', body);

  let aData = body.allData;
  console.log('aData', aData);
  projectData['countryName'] = aData.geonamesData.countryName;
  projectData['lat'] = aData.geonamesData.lat;
  projectData['lng'] = aData.geonamesData.lng;
  projectData['startDate'] = aData.geonamesData.startDate;
  projectData['endDate'] = aData.geonamesData.endDate;
  projectData['cityName'] = aData.geonamesData.cityName;
  projectData['countDownDays'] = aData.geonamesData.countDownDays;
  projectData['lengthOfTrip'] = aData.geonamesData.lengthOfTrip;

  projectData['max_temp'] = aData.weatherData.max_temp;
  projectData['min_temp'] = aData.weatherData.min_temp;
  projectData['weather_description'] = aData.weatherData.weather_description;
  projectData['datetime'] = aData.weatherData.datetime;
  projectData['weatherIcon'] = aData.weatherData.weatherIcon;

  projectData['cityTotalHits'] = aData.imageData.cityTotalHits;
  projectData['cityWebformatURL'] = aData.imageData.cityWebformatURL;
  projectData['countryTotalHits'] = aData.imageData.countryTotalHits;
  projectData['countryWebformatURL'] = aData.imageData.countryWebformatURL;

  projectData['alpha3Code'] = aData.countryInfoData.alpha3Code;
  projectData['capital'] = aData.countryInfoData.capital;
  projectData['region'] = aData.countryInfoData.region;
  projectData['demonym'] = aData.countryInfoData.demonym;
  projectData['timezones'] = aData.countryInfoData.timezones;
  projectData['nativeName'] = aData.countryInfoData.nativeName;
  projectData['currenciesCode'] = aData.countryInfoData.currenciesCode;
  projectData['currenciesName'] = aData.countryInfoData.currenciesName;
  projectData['currenciesSymbol'] = aData.countryInfoData.currenciesSymbol;
  projectData['languagesName'] = aData.countryInfoData.languagesName;
  projectData['flag'] = aData.countryInfoData.flag;

  console.log('all projectData', projectData);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'The sky is blue.', status: 'success' }),
  };
};
