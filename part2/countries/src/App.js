import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';

const App = ({ countries }) => {
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const includesSearchString = (country) => {
    return country.name.toLowerCase().includes(search.toLocaleLowerCase())
  }

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
    setFilteredCountries(countries.filter(includesSearchString));
  }

  return (
    <>
      <Search handleSearchInput={search} handleSearchInputChange={handleSearchInputChange} />
      <Results filteredCountries={filteredCountries} />
    </>
  );
}

export default App;
