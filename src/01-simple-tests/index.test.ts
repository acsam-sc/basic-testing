// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Add})).toBe(12)
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Subtract})).toBe(6)
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Multiply})).toBe(27)
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Divide})).toBe(3)
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Exponentiate})).toBe(729)
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action })).toBeNull()
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: null, b: 3, action: Action.Add })).toBeNull()
  });
});
