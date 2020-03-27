import React from 'react';
import PropTypes from 'prop-types';

const Country = ({ country, handleShowCountryButton }) => (
  <div>
    {country.name}
    <button type="button" value={country.name} onClick={handleShowCountryButton}>show</button>
  </div>
);

Country.propTypes = {
  country: PropTypes.objectOf(PropTypes.string).isRequired,
  handleShowCountryButton: PropTypes.func.isRequired,
};

export default Country;
