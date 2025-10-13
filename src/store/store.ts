import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentWeatherSliceReducer from './slices/currentWeatherSlice';

const rootReducer = combineReducers({
  currentWeatherSliceReducer,
}); // сюда будут добавляться редьсеры

export const store = configureStore({ // глобавльное хранилище
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
