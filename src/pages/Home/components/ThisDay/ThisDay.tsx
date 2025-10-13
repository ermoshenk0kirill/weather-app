import s from './ThisDay.module.scss';
import type { Weather } from '../../../../store/types/types';

type Props = {
  weather: Weather;
};

export const ThisDay = ({ weather }: Props) => {
  if (!weather || !weather.main) {
    return <div className={s.this_day}>Загрузка...</div>;
  }
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const temp = Math.floor(weather.main.temp ?? 0);

  return (
    <div className={s.this_day}>
      <div className={s.top_block}>
        <div className={s.top_block_wrapper}>
          <div className={s.this_day_temp}>{temp}°</div>
          <div className={s.day_now}>{weather.weather?.[0]?.description ?? '—'}</div>
        </div>
        <div className={s.this_day_icon}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
            alt={weather.weather?.[0]?.main}
          />
        </div>
      </div>
      <div className={s.bottom_block}>
        <div className={s.this_time}>Время: <span>{currentTime}</span></div>
        <div className={s.this_city}>Город: {weather.name}</div>
      </div>
    </div>
  );
};