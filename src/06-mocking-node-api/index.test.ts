import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(globalThis, 'setTimeout')
    const callbackFunc = jest.fn()
    const timeoutInMs = 1000
    
    doStuffByTimeout(callbackFunc, timeoutInMs)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(callbackFunc, timeoutInMs)
  });

  test('should call callback only after timeout', () => {
    const callbackFunc = jest.fn()
    const timeoutInMs = 1000
    doStuffByTimeout(callbackFunc, timeoutInMs)

    expect(callbackFunc).not.toHaveBeenCalled()
    jest.advanceTimersByTime(timeoutInMs - 10)
    expect(callbackFunc).not.toHaveBeenCalled()
    jest.advanceTimersByTime(10)
    expect(callbackFunc).toHaveBeenCalledTimes(1)

  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(globalThis, 'setInterval')
    const callbackFunc = jest.fn()
    const intervalInMs = 1000
    
    doStuffByInterval(callbackFunc, intervalInMs)

    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenCalledWith(callbackFunc, intervalInMs)
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackFunc = jest.fn()
    const intervalInMs = 1000
    const intervals = 10
    doStuffByInterval(callbackFunc, intervalInMs)

    expect(callbackFunc).not.toHaveBeenCalled()
    jest.advanceTimersByTime(intervalInMs * intervals)
     expect(callbackFunc).toHaveBeenCalledTimes(intervals)
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = '/path/to/file'
    const joinSpy = jest.spyOn(path, 'join')
    readFileAsynchronously(pathToFile)

    expect(joinSpy).toHaveBeenCalledTimes(1)
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile)
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/path/to/file'
    jest.spyOn(fs, 'existsSync').mockReturnValue(false)
    expect(await readFileAsynchronously(pathToFile)).toBeNull()
  });

  test('should return file content if file exists', async () => {
    const pathToFile = '/path/to/file'
    const fileContent = 'I am File Content!'
    jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent)

    expect(await readFileAsynchronously(pathToFile)).toBe(fileContent)
  });
});
