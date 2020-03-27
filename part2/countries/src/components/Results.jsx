import React from 'react';
import PropTypes from 'prop-types';
import Country from './Country';
import CountryFull from './CountryFull';

const Results = ({ filteredCountries, handleShowCountryButton }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length > 1) {
    return (
      filteredCountries.map((country) => (
        <Country
          key={country.name}
          country={country}
          handleShowCountryButton={handleShowCountryButton}
        />
      ))
    );
  }

  if (filteredCountries.length === 1) {
    return <CountryFull country={filteredCountries[0]} />;
  }

  return <div>No matching results, specify another filter</div>;
};

Results.propTypes = {
  filteredCountries: PropTypes.arrayOf(PropTypes.objects).isRequired,
  handleShowCountryButton: PropTypes.func.isRequired,
};

export default Results;
