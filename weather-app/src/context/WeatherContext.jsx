import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(localStorage.getItem('lastCity') || '');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      // 1. Get current weather
      const res1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const data1 = await res1.json();
      if (!res1.ok) throw new Error(data1.message);

      // 2. Get 5-day forecast
      const res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
      );
      const data2 = await res2.json();
      if (!res2.ok) throw new Error(data2.message);

      setWeatherData(data1);
      setForecastData(data2);
      setError(null);
      localStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  // Fetch every 30 seconds
  useEffect(() => {
    if (city) {
      fetchWeather(city);
      const interval = setInterval(() => fetchWeather(city), 30000);
      return () => clearInterval(interval);
    }
  }, [city]);

  return (
    <WeatherContext.Provider value={{ city, setCity, weatherData, forecastData, error, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
