import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {

  const apiURL = '/someApi'
  const baseURL = 'https://jsonplaceholder.typicode.com'

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create')
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ status: 200, data: 'DataFromServer' })
    await throttledGetDataFromApi(apiURL)
    expect(axiosCreateSpy).toHaveBeenCalledTimes(1)
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: baseURL ,
    })
    throttledGetDataFromApi.cancel()
  })

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ status: 200, data: 'DataFromServer' })
    await throttledGetDataFromApi(apiURL)
    expect(axiosGetSpy).toHaveBeenCalledWith(apiURL)
    throttledGetDataFromApi.cancel()
  });

  test('should return response data', async () => {
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ status: 200, data: 'DataFromServer' })
    await throttledGetDataFromApi(apiURL)
    expect(await throttledGetDataFromApi(apiURL)).toBe('DataFromServer')
    throttledGetDataFromApi.cancel()
  });
});
