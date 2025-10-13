import s from './ThisDay.module.scss'
import { GlobalSelectors } from '../../../../assets/icons/global/GlobalSelectors'
import type { Weather } from '../../../../store/types/types'

type Props = {
  weather: Weather;
}

export const ThisDay = ({weather}: Props) => {
  return (
    <div className={s.this_day}>
      <div className={s.top_block}>
        <div className={s.top_block_wrapper}>
          <div className={s.this_day_temp}>{Math.floor(weather.main.temp)}°</div>
          <div className={s.day_now}>Today</div>
        </div>
        <div className={s.this_day_icon}>
          <GlobalSelectors id='weather_icon'/>
        </div>
      </div>
      <div className={s.bottom_block}>
        <div className={s.this_time}>Время: <span>10:10</span></div>
        <div className={s.this_city}>Moscow</div>
      </div>
    </div>
  )
}