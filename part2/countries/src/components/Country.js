import React from 'react';
import PropTypes from 'prop-types';

const Country = ({ country, handleShowCountryButton }) => (
  <div>
    <strong>{country.name}</strong> -
    {' '}
    <button type="button" value={country.name} onClick={() => handleShowCountryButton(country.name)}><strong>Show</strong></button>
  </div>
);

Country.propTypes = {
  country: PropTypes.objectOf(PropTypes.any).isRequired,
  handleShowCountryButton: PropTypes.func.isRequired,
};

export default Country;
