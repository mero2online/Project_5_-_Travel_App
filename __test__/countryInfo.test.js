// Import this to fix this issue [referenceerror: regeneratorruntime is not defined]
import "core-js/stable";
import "regenerator-runtime/runtime";

// Import the js file to test
import { countryInfo } from '../src/client/js/countryInfo';

describe('Testing the submit functionality', () => {
  test('Testing the countryInfo() function', () => {
    expect(countryInfo).toBeDefined();
  });
});

describe('Testing the typeof countryInfo() to be a function', () => {
  test('It should be a function', () => {
    expect(typeof countryInfo).toBe('function');
  });
});
