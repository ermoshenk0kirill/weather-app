import type {AxiosResponse} from "axios";
import axios from "axios";
import api from '../axios/index'

import type { Weather } from "../store/types/types";

export class WeatherService {
  static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`/weather?q=${city}`);
  }
}
