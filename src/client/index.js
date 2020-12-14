import { performAction } from './js/performAction';
import { countDown } from './js/countDown';
import { imageData } from './js/imageData';
import { weatherData } from './js/weatherData';

import './styles/style-main.scss';
import './styles/style-larg.scss';
import './styles/style-medium.scss';
import './styles/style-small.scss';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

export { performAction, countDown, imageData, weatherData };

document.querySelector('#city').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('generate').click();
  }
});
