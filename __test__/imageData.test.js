// Import this to fix this issue [referenceerror: regeneratorruntime is not defined]
import "core-js/stable";
import "regenerator-runtime/runtime";

// Import the js file to test
import { imageData } from '../src/client/js/imageData';

describe('Testing the submit functionality', () => {
  test('Testing the imageData() function', () => {
    expect(imageData).toBeDefined();
  });
});

describe('Testing the typeof imageData() to be a function', () => {
  test('It should be a function', () => {
    expect(typeof imageData).toBe('function');
  });
});
