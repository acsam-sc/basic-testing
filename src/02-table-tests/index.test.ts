import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: -2, b: 6, action: Action.Add, expected: 4 },
    { a: 9, b: 3, action: Action.Subtract, expected: 6},
    { a: 4, b: 8, action: Action.Subtract, expected: -4},
    { a: 9, b: 3, action: Action.Divide, expected: 3},
    { a: 9, b: -3, action: Action.Divide, expected: -3},
    { a: 8, b: 7, action: Action.Multiply, expected: 56},
    { a: -8, b: 4, action: Action.Multiply, expected: -32},
    { a: 4, b: 3, action: Action.Exponentiate, expected: 64},
    { a: -3, b: 3, action: Action.Exponentiate, expected: -27},
    { a: -3, b: 2, action: Action.Exponentiate, expected: 9},
    { a: null, b: 2, action: Action.Add, expected: null },
    { a: 3, b: null, action: Action.Add, expected: null },
    { a: 7, b: 2, action: Action, expected: null } 
];

describe('simpleCalculator', () => {
    test.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected)
    })
});
