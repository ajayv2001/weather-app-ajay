import React from 'react';
import SearchBar from './components/searchBar/SearchBar';
import WeatherDisplay from './components/weatherDisplay/WeatherDisplay';
import ErrorDisplay from './components/errorDisplay/ErrorDisplay';
import { WeatherProvider } from './context/WeatherContext';
import './App.css';

function App() {
  return (
    <WeatherProvider>
      <div className="app-container">
        <h1 className="app-title">Weather Dashboard</h1>
        <SearchBar />
        <ErrorDisplay />
        <WeatherDisplay />
      </div>
    </WeatherProvider>
  );
}

export default App;
