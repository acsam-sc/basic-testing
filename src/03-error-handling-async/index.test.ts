// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'ValueToResolve'
    expect(await resolveValue(value)).toBe(value)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Message for throwError'
    expect(() => throwError(message)).toThrow(Error(message))
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(Error('Oops!'))
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(async () => await rejectCustomError()).rejects.toThrow(MyAwesomeError)
  });
});
