let projectData = {};

exports.handler = async function (event, context) {
  let dataRoute = event.path.split('/').pop();
  if (dataRoute === 'geonamesData') {
    const body = JSON.parse(event.body);
    console.log('body geonamesData', body);
    projectData['geonamesData'] = body;
    console.log('all projectData geonamesData', projectData);
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: 'geonamesData',
      }),
    };
  } else if (dataRoute === 'countryInfo') {
    const body = JSON.parse(event.body);
    console.log('body countryInfo', body);
    projectData['countryInfo'] = body;
    console.log('all projectData countryInfo', projectData);
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: 'countryInfo',
      }),
    };
  } else if (dataRoute === 'imageData') {
    const body = JSON.parse(event.body);
    console.log('body imageData', body);
    projectData['imageData'] = body;
    console.log('all projectData imageData', projectData);
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: 'imageData',
      }),
    };
  } else if (dataRoute === 'weatherData') {
    const body = JSON.parse(event.body);
    console.log('body weatherData', body);
    projectData['weatherData'] = body;
    console.log('all projectData weatherData', projectData);
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: 'weatherData',
      }),
    };
  }
  console.log('all projectData', projectData);
  if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/allData') {
    console.log('event.path', event.path);
    return {
      statusCode: 200,
      body: JSON.stringify({
        allData: projectData,
      }),
    };
  }
};
