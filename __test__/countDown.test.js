// Import the js file to test
import { countDown } from '../src/client/js/countDown';

describe('Testing the countDown functionality', () => {
  test('Testing the countDown() function', () => {
    expect(countDown).toBeDefined();
  });
});

describe('Testing the countDown values', () => {
  test('Testing the countDown() function', () => {
    let startDate = new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .split('T')[0];

    let endDate = new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split('T')[0];

    expect(countDown(startDate, endDate)).toStrictEqual([1, 5]);
  });
});
