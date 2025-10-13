import { useEffect } from 'react'
import s from './Home.module.scss'
import { ThisDay } from './ThisDay/ThisDay'
import { ThisDayInfo } from './ThisDayInfo/ThisDayInfo'
import { Days } from './Days/Days'
import { useCustomDispatch, useCustomSelector } from '../../../hooks/store'
import { fetchCurrentWeather } from '../../../thunks/fetchCurrentWeather'
import { fetchForecastWeather } from '../../../thunks/fetchForecastWeather'
type Props = {
  city: string;
};

const Home = ({ city }: Props) => {
  const dispatch = useCustomDispatch();
  const { weather} = useCustomSelector((state) => state.currentWeatherSliceReducer);

  // при изменении города — подгружаем текущую погоду и прогноз
  useEffect(() => {
    if (!city) return;
    dispatch(fetchCurrentWeather(city));
    dispatch(fetchForecastWeather(city));
  }, [city, dispatch]);

  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        <ThisDay weather={weather} />
        <ThisDayInfo weather={weather} />
      </div>
      <Days city={city} />
    </div>
  );
};

export default Home;