// Import this to fix referenceerror: regeneratorruntime is not defined
import "core-js/stable";
import "regenerator-runtime/runtime";

// Import the js file to test
import { performAction } from '../src/client/js/performAction';

describe('Testing the submit functionality', () => {
  test('Testing the performAction() function', () => {
    expect(performAction).toBeDefined();
  });
});

describe('Testing the typeof performAction() to be a function', () => {
  test('It should be a function', () => {
    expect(typeof performAction).toBe('function');
  });
});
