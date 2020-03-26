import React from 'react';
import Country from './Country';
import CountryFull from './CountryFull';

//TODO: Refactor to IF statements, final must be === 1 not < 2
const Results = ({ filteredCountries, handleShowCountryButton }) => {
  if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    );
  } else if (filteredCountries.length > 1) {
    return (
      filteredCountries.map(country => 
        <Country 
          key={country.name} 
          country={country} 
          handleShowCountryButton={handleShowCountryButton} 
        />)
    );
  } else if (filteredCountries.length === 1) {
    return (
      <CountryFull country={filteredCountries[0]} />
    );
  } else {
    return (
      <div>No matching results, specify another filter</div>
    );
  }
}

export default Results; 