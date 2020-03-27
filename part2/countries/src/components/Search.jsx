import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ handleSearchInput, handleSearchInputChange }) => (
  <div>
    find countries &nbsp;
    <input value={handleSearchInput} onChange={handleSearchInputChange} />
  </div>
);


Search.propTypes = {
  handleSearchInput: PropTypes.func.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
};

export default Search;
