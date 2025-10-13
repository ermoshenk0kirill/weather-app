import type { RootState } from '../store/store';
export const selectCurrentWeatherData = (state: RootState) => {
  return state.currentWeatherSliceReducer;
};