import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Weather } from "../types/types";

type WeatherResponse = {
  data: Weather;
  status: number;
  statusText: string;
};

// Тип состояния
type CurrentWeatherState = {
  weather: Weather;
  isLoading: boolean;
  response: {
    status: number;
    message: string;
  };
};

// Начальное состояние
const initialState: CurrentWeatherState = {
  weather: {} as Weather,
  isLoading: false,
  response: {
    status: 0,
    message: "",
  },
};

// Слайс
export const currentWeatherSlice = createSlice({
  name: "current_weather",
  initialState,
  reducers: {
    fetchCurrentWeather(state) {
      state.isLoading = true;
    },
    fetchCurrentWeatherSuccess(state, action: PayloadAction<WeatherResponse>) {
      state.isLoading = false;
      state.weather = action.payload.data;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCurrentWeatherError(state, action: PayloadAction<WeatherResponse>) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export default currentWeatherSlice.reducer;