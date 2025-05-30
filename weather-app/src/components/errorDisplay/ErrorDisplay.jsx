import React, { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import './ErrorDisplay.css';

function ErrorDisplay() {
  const { error } = useContext(WeatherContext);

  if (!error) return null;

  return (
    <div className="error-message">
      ⚠️ Error: {error}
    </div>
  );
}

export default ErrorDisplay;
