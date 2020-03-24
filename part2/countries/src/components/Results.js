import React from 'react';
import Country from './Country';
import CountryFull from './CountryFull';

const Results = ({ filteredCountries }) => {
  return (filteredCountries.length > 10) 
    ? <div>Too many matches, specify another filter</div>
    : (filteredCountries.length > 1)
      ? filteredCountries.map(country => <Country key={country.name} country={country} />)
      : <CountryFull country={filteredCountries[0]} />;
}

export default Results;