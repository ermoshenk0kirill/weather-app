import React, { useState } from 'react';
import s from './Header.module.scss';
import { GlobalSelectors } from '../../assets/icons/global/GlobalSelectors';

type Props = {
  onCityChange: (city: string) => void;
};

const Header = ({ onCityChange }: Props) => {
  const [city, setCity] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onCityChange(city.trim());
      setCity('');
    }
  };

  return (
    <header className={s.Header}>
      <div className={s.themeIcon}>
        <GlobalSelectors id="change_theme" />
      </div>

      <div className={s.titleName}>Weather App</div>

      <form className={s.searchWrapper} onSubmit={handleSubmit}>
        <input
          className={s.searchInput}
          type="text"
          placeholder="Поиск 🔍"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className={s.searchBtn} type="submit">
        
        </button>
      </form>
    </header>
  );
};

export default Header;