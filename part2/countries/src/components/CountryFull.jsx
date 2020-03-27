import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Weather from './Weather';

const CountryFull = ({ country }) => {
  const accessKey = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState('');

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}`)
      .then((response) => {
        if (response.data.success !== false) {
          setWeather(response.data);
        }
      });
  });

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        {`capital ${country.capital}`}
      </div>
      <div>
        {`population ${country.population}`}
      </div>
      <h1>languages</h1>
      <ul>
        {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img alt={`flag of ${country.name}`} src={country.flag} height="150px" />
      <h2>{`Weather in ${country.name}`}</h2>
      <Weather weather={weather} />
    </div>
  );
};

CountryFull.propTypes = {
  country: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CountryFull;
