import PropTypes from 'prop-types';
import React from 'react';

const Filter = ({ handleFilterInput, handleFilterInputChange }) => (
  <div>
    Apply filter to shown numbers:{' '}
    <input value={handleFilterInput} onChange={handleFilterInputChange} />
  </div>
);

Filter.propTypes = {
  handleFilterInput: PropTypes.string.isRequired,
  handleFilterInputChange: PropTypes.func.isRequired
};

export default Filter;
