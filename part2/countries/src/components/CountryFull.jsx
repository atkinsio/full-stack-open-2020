import React from 'react';
import PropTypes from 'prop-types';

const CountryFull = ({ country }) => (
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
  </div>
);

CountryFull.propTypes = {
  country: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CountryFull;
