import React from 'react'
import s from './Header.module.scss'
import { GlobalSelectors } from '../../assets/icons/global/GlobalSelectors'
import Select from 'react-select'
type Props = {}

const Header = (props: Props) => {
  const options = [
    { value: 'city-1', label: 'Санкт-Петербург' },
    { value: 'city-2', label: 'Москва' },
    { value: 'city-3', label: 'Псков' }
  ]

  const colorStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#4793FF33',
      width: '100%',
      borderRadius: '40px',
      border: 'none',
    })
  }

  return (
    <header className={s.Header}>
      <div className={s.themeIcon}>
        <GlobalSelectors id="change_theme" />
      </div>
      <div className={s.titleName}>
        Weather-app
      </div>
      <div className={s.selectWrapper}>
        <Select
          defaultValue={options[0]} 
          styles={colorStyles}
          options={options} />
      </div>
    </header>
  );
}

export default Header