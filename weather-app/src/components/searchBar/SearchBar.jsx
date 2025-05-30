import React, { useState, useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import './SearchBar.css';

function SearchBar() {
  const [input, setInput] = useState('');
  const { setCity, fetchWeather } = useContext(WeatherContext);

  const handleSearch = () => {
    if (!input) return;
    setCity(input);
    fetchWeather(input);
    setInput('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
