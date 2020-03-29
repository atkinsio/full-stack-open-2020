import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ handleSearchInput, handleSearchInputChange }) => (
  <div>
    Search: {' '}
    <input value={handleSearchInput} onChange={handleSearchInputChange} />
  </div>
);


Search.propTypes = {
  handleSearchInput: PropTypes.string.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
};

export default Search;
