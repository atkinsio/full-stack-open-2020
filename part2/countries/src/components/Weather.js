import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({ weather }) => {
  if (weather !== '') {
    return (
      <div>
        <div>{`Temperature: ${weather.current.temperature} Celcius`}</div>
        <img alt="weather icon" src={weather.current.weather_icons[0]} />
        <div>{`Wind: ${weather.current.wind_speed} mph ${weather.current.wind_dir}`}</div>
      </div>
    );
  }

  return <div>Weather data not available, check API key and availability</div>;
};

Weather.propTypes = {
  weather: PropTypes.any.isRequired,
};

export default Weather;
