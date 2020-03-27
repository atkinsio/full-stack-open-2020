import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({ weather }) => {
  if (weather !== '') {
    return (
      <div>
        <div>{`temperature ${weather.current.temperature} Celcius`}</div>
        <img alt="weather icon" src={weather.current.weather_icons[0]} />
        <div>{`wind ${weather.current.wind_speed} mph ${weather.current.wind_dir}`}</div>
      </div>
    );
  }

  return <div>Weather data not available</div>;
};

Weather.propTypes = {
  weather: PropTypes.any.isRequired,
};

export default Weather;
