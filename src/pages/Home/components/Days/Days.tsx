import { useEffect, useState } from "react";
import s from "./Days.module.scss";
import { Card } from "./Card";
import { WeatherService } from "../../../../services/WeatherService";

export interface Day {
  day: string;
  day_info: string;
  icon_id: string;
  temp_day: string;
  temp_night: string;
  info: string;
}

type Props = {
  city: string;
};

export const Days = ({ city }: Props) => {
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      setLoading(false);
      return;
    }

    async function loadForecast() {
      setLoading(true);
      try {
        const res = await WeatherService.getForecastWeather(city);
        const list = res.data?.list ?? [];
        const daily = getFiveDaysForecast(list);

        const preparedDays: Day[] = daily.map((item: any) => {
          const date = new Date(item.dt * 1000);
          const weekday = date.toLocaleDateString("ru-RU", {
            weekday: "short",
          });
          const dayInfo = date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
          });

          return {
            day: capitalizeFirst(weekday),
            day_info: dayInfo,
            icon_id: mapWeatherIcon(item.weather[0].icon),
            temp_day: `${Math.round(item.main.temp_max)}°`,
            temp_night: `${Math.round(item.main.temp_min)}°`,
            info: item.weather[0].description,
          };
        });

        setDays(preparedDays);
      } catch (e) {
        console.error("Ошибка при загрузке прогноза:", e);
        setDays([]);
      } finally {
        setLoading(false);
      }
    }

    loadForecast();
  }, [city]);

  if (loading) {
    return <div className={s.days}>Загрузка прогноза...</div>;
  }

  return (
    <div className={s.days}>
      {days.map((day: Day) => (
        <Card key={day.day_info} day={day} />
      ))}
    </div>
  );
};

// Берем прогноз 1 раз в днь в 12:00
function getFiveDaysForecast(list: any[]) {
  const dailyData: any[] = [];
  const usedDates = new Set();

  for (const item of list) {
    const [date, time] = item.dt_txt.split(" ");
    const hour = time.split(":")[0];
    if (hour === "12" && !usedDates.has(date)) {
      usedDates.add(date);
      dailyData.push(item);
    }
  }

  // если данных - берем ближайшие доступные 
  if (dailyData.length < 5) {
    const byDate: Record<string, any> = {};
    for (const it of list) {
      const date = it.dt_txt.split(" ")[0];
      if (!byDate[date]) byDate[date] = it;
    }
    const fallback = Object.values(byDate).slice(0, 5);
    return dailyData.concat(fallback).slice(0, 5);
  }

  return dailyData.slice(0, 5);
}
// форматируем текс
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// сопоставляем иконки из апи
function mapWeatherIcon(openIcon: string): string {
  if (openIcon.includes("01")) return "sun";
  if (openIcon.includes("02")) return "small_rain_sun";
  if (openIcon.includes("03") || openIcon.includes("04"))
    return "mainly_cloudy";
  if (openIcon.includes("09") || openIcon.includes("10")) return "rain";
  if (openIcon.includes("11")) return "thunder";
  if (openIcon.includes("13")) return "snow";
  if (openIcon.includes("50")) return "fog";
  return "sun";
}
