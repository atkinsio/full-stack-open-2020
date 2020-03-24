import React from 'react';

const Search = ({ handleSearchInput, handleSearchInputChange }) => {
  return (
    <div>
      find countries <input value={handleSearchInput} onChange={handleSearchInputChange} />
    </div>
  );
}

export default Search;