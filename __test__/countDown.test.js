// Import the js file to test
import { countDown } from '../src/client/js/countDown';

describe('Testing the countDown functionality', () => {
  test('Testing the countDown() function', () => {
    expect(countDown).toBeDefined();
  });
});

describe('Testing the countDown values', () => {
  test('Testing the countDown() function', () => {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + 2);

    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    expect(countDown(startDate, endDate)).toStrictEqual([2, 5]);
  });
});
