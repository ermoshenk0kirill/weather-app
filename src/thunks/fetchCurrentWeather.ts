import { WeatherService } from '../../src/services/WeatherService';
import { currentWeatherSlice } from '../store/slices/currentWeatherSlice';
import type { AppDispatch } from '../store/store';
import type { Weather } from '../store/types/types';

// Тип для данных, которые передаем в Redux
type WeatherResponse = {
  data: Weather;
  status: number;
  statusText: string;
};

export const fetchCurrentWeather =
  (city: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currentWeatherSlice.actions.fetchCurrentWeather());

      const res = await WeatherService.getCurrentWeather(city);

      const weatherResponse: WeatherResponse = {
        data: res.data,
        status: res.status,
        statusText: res.statusText,
      };

      if (res.status === 200) {
        dispatch(currentWeatherSlice.actions.fetchCurrentWeatherSuccess(weatherResponse));
      } else {
        dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(weatherResponse));
      }
    } catch (error) {
      console.error('Ошибка при получении данных о погоде:', error);
      dispatch(
        currentWeatherSlice.actions.fetchCurrentWeatherError({
          data: {} as Weather,
          status: 500,
          statusText: 'Internal Server Error',
        })
      );
    }
  };