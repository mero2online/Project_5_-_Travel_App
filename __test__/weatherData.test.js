// Import this to fix this issue [referenceerror: regeneratorruntime is not defined]
import "core-js/stable";
import "regenerator-runtime/runtime";

// Import the js file to test
import { weatherData } from '../src/client/js/weatherData';

describe('Testing the submit functionality', () => {
  test('Testing the weatherData() function', () => {
    expect(weatherData).toBeDefined();
  });
});

describe('Testing the typeof weatherData() to be a function', () => {
  test('It should be a function', () => {
    expect(typeof weatherData).toBe('function');
  });
});
