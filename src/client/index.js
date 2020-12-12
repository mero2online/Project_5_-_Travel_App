import { performAction } from './js/performAction';
import { countDown } from './js/countDown';
import { weatherData } from './js/weatherData';

import './styles/style.scss';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

export { performAction, countDown, weatherData };

document.querySelector('#city').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('generate').click();
  }
});
