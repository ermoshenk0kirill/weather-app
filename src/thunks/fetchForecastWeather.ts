import { WeatherService } from "../../src/services/WeatherService";
export const fetchForecastWeather =
  (city: string) => async () => {
    try {
      const res = await WeatherService.getForecastWeather(city);
      if (res.status === 200) {
      }
      return res.data;
    } catch (error) {
      console.error("Ошибка при получении прогноза:", error);
      throw error;
    }
  };