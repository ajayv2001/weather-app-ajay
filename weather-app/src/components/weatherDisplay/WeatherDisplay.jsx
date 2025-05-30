import React, { useContext, useState } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  const { weatherData } = useContext(WeatherContext);
  const [activeTab, setActiveTab] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);

  if (!weatherData || !weatherData.weather || !weatherData.main) {
    return <p className="weather-loading">Loading...</p>;
  }

  const days = ['Today', 'Day 1', 'Day 2', 'Day 3', 'Day 4']; 

  const { name, main, wind, weather } = weatherData;
  const icon = weather[0].icon;

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const displayTemp = isCelsius
    ? `${main.temp.toFixed(1)}°c`
    : `${((main.temp * 9) / 5 + 32).toFixed(1)}°f`;

  return (
    <div className="weather-page">
      <nav className="weather-navbar">
        {days.map((day, index) => (
          <button
            key={index}
            className={`nav-item ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {day}
          </button>
        ))}
      </nav>

      <div className="weather-card">
        <div className="weather-card-header">
          <h2>{days[activeTab]} - {name}</h2>
          <div className="temperature">{displayTemp}</div>
          <button onClick={toggleUnit} className="unit-toggle-btn">
            Switch to {isCelsius ? '°F' : '°C'}
          </button>
        </div>

        <div className="weather-description">
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather"
          />
          <p>{weather[0].description}</p>
        </div>

        <div className="weather-details">
          <div><strong>Humidity:</strong> {main.humidity}%</div>
          <div><strong>Wind:</strong> {wind.speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
