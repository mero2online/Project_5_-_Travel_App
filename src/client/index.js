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

// Event listener to remove trip button to remove the trip
document
  .getElementById('removeTrip')
  .addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelectorAll('#entryHolder div').forEach((element) => {
      element.textContent = '';
    });
    event.target.parentNode.parentNode.style.display = 'none';
  });
