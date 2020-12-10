function checkForURL(inputURL) {
  console.log('::: Running checkForURL :::', inputURL);

  function validURL(inputURL) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(inputURL);
  }

  if (validURL(inputURL)) {
    return true;
  }
  return false;
}

export {
  checkForURL
};