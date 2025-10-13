import type { AxiosResponse } from "axios";
import api from "../axios/index";
import type { Weather } from "../store/types/types";

export class WeatherService {
  
  // Текущая погода
  static getCurrentWeather(city: string, lang:string = "ru"): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`/weather?q=${city}&lang=${lang}`);
  }

  // Прогноз на 5 дней
  static getForecastWeather(city: string, lang:string = "ru"): Promise<AxiosResponse<any>> {
    return api.get(`/forecast?q=${city}&lang=${lang}`);
  }
}
