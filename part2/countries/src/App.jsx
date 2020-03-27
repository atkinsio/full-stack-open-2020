import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Search from './components/Search';
import Results from './components/Results';

const App = ({ countries }) => {
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
    setFilteredCountries(
      countries.filter((country) => country.name.toLowerCase()
        .includes(event.target.value.toLocaleLowerCase())),
    );
  };

  const handleShowCountryButton = (event) => {
    setSearch(event.target.value);
    setFilteredCountries(countries.filter((country) => country.name === event.target.value));
  };

  return (
    <>
      <Search
        handleSearchInput={search}
        handleSearchInputChange={handleSearchInputChange}
      />
      <Results
        filteredCountries={filteredCountries}
        handleShowCountryButton={handleShowCountryButton}
      />
    </>
  );
};

App.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default App;
