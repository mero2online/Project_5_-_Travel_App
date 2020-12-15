import { performAction } from './js/performAction';
import { countDown } from './js/countDown';
import { countryInfo } from './js/countryInfo';
import { imageData } from './js/imageData';
import { weatherData } from './js/weatherData';

import './styles/style-main.scss';
import './styles/style-larg.scss';
import './styles/style-medium.scss';
import './styles/style-small.scss';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

export { performAction, countDown, countryInfo, imageData, weatherData };

// Event listener to submit the form from keyboard
document.querySelector('#city').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('generate').click();
  }
});

// Event listener to remove trip data
document
  .getElementById('removeTrip')
  .addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelectorAll('#entryHolder div').forEach((element) => {
      element.textContent = '';
    });
    event.target.parentNode.parentNode.style.display = 'none';

    document.getElementById('city').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';

    localStorage.clear();
  });

// Event listener to save trip data
document.getElementById('saveTrip').addEventListener('click', function (event) {
  event.preventDefault();
  populateStorage();
});

/* 
Use Local Storage to save the data so that when they close, 
then revisit the page, their information is still there.
*/
if (!localStorage.getItem('city')) {
  populateStorage();
} else {
  setData();
}

function populateStorage() {
  localStorage.setItem('city', document.getElementById('city').value);
  localStorage.setItem('startDate', document.getElementById('startDate').value);
  localStorage.setItem('endDate', document.getElementById('endDate').value);
}

function setData() {
  var currentCity = localStorage.getItem('city');
  var currentStartDate = localStorage.getItem('startDate');
  var currentEndDate = localStorage.getItem('endDate');

  document.getElementById('city').value = currentCity;
  document.getElementById('startDate').value = currentStartDate;
  document.getElementById('endDate').value = currentEndDate;
}
