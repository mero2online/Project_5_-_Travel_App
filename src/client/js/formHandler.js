function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let inputURL = document.getElementById('url-input').value;

  let validityAlert = document.querySelector('.validityAlert');
  let validityAlert_message = document.querySelector('.validityAlert-message');
  // check if alert message exist to remove it
  if (
    typeof validityAlert_message != 'undefined' &&
    validityAlert_message != null
  ) {
    validityAlert_message.remove();
  }

  console.log('::: Form Submitted :::');
  
  // check if inputURL vaild print message and if not vaild print another message
  if (Client.checkForURL(inputURL)) {
    validityAlert.insertAdjacentHTML(
      'afterbegin',
      '<div class="validityAlert-message valid-url">URL is valid</div>'
    );
  } else {
    validityAlert.insertAdjacentHTML(
      'afterbegin',
      '<div class="validityAlert-message not-vaild-url">URL is not valid!</div>'
    );
  }
  // fetch api key from server to make API call
  fetch('/api')
    .then((data) => data.json())
    .then(function (data) {
      let apiKey = data.apiKey;

      // Base URL for MeaningCloud API
      let baseURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${inputURL}&lang=en`;

      // fetch data from MeaningCloud API and print it to html file
      fetch(baseURL)
        .then((res) => res.json())
        .then(function (res) {
          console.log(res);
          var allData = JSON.stringify(res);
          document.getElementById('agreement-result').innerHTML = `<td>Agreement:</td><td>${res.agreement}</td>`
          document.getElementById('confidence-result').innerHTML = `<td>Confidence:</td><td>${res.confidence}</td>`
          document.getElementById('irony-result').innerHTML = `<td>Irony:</td><td>${res.irony}</td>`
          document.getElementById('model-result').innerHTML = `<td>Model:</td><td>${res.model}</td>`
          document.getElementById('subjectivity-result').innerHTML = `<td>Subjectivity:</td><td>${res.subjectivity}</td>`;
          document.getElementById('score-tag-result').innerHTML = `<td>Score Tag:</td><td>${res.score_tag}</td>`;
          document.getElementById('all-result').innerHTML = `<td>All info:</td><td>${allData}</td>`;
          document.querySelector('.collapsible').style.visibility = 'visible';
        });
    });
}

export {
  handleSubmit
};