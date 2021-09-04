import * as Helpers from '../';

jest.mock('const', () => ({ STORE_KEYS: {}, POSTS: {}, ROUTES: { HOME: '/' } }));

describe('[stringHelpers]', () => {
  test('getShortenedQuarter - returns shortened quarter/year string', () => {
    // [quarterString, expected]
    const testCases = [
      ['Q1 2021', "Q1 '21"],
      ['Q4 1999', "Q4 '99"],
    ];

    testCases.forEach(testCase => {
      expect(Helpers.getShortenedQuarter(testCase[0])).toEqual(testCase[1]);
    });
  });
});
