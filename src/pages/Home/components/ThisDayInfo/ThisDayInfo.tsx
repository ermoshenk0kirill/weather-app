
import s from './ThisDayInfo.module.scss';
import { ThisDayItem } from './ThisDayItem';
import type { Weather } from '../../../../store/types/types';

export interface Item {
  icon_id: string;
  name: string;
  value: string;
}

type Props = {
  weather: Weather;
};

export const ThisDayInfo = ({ weather }: Props) => {
  if (!weather || !weather.main || !weather.wind) {
    return <div>Загрузка...</div>;
  }

  const items: Item[] = [
    {
      icon_id: 'temp',
      name: 'Температура',
      value: `${Math.round(weather.main.temp)}° - ощущается как ${Math.round(weather.main.feels_like)}°`,
    },
    {
      icon_id: 'pressure',
      name: 'Давление',
      value: `${weather.main.pressure} мм ртутного столба - ${weather.main.pressure >= 760 ? 'высокое' : weather.main.pressure < 740 ? 'низкое' : 'нормальное'}`,
    },
    {
      icon_id: 'humidity',
      name: 'Влажность',
      value: `${weather.main.humidity}%`,
    },
    {
      icon_id: 'wind',
      name: 'Ветер',
      value: `${weather.wind.speed} м/с, направление ${weather.wind.deg}°`,
    },
  ];

  return (
    <div className={s.this_day_info}>
      <div className={s.this_day_info_items}>
        {items.map((item) => (
          <ThisDayItem key={item.icon_id} item={item} />
        ))}
      </div>
    </div>
  );
};