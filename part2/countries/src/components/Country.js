import React from 'react';

const Country = ({ country, handleShowCountryButton }) => {
  return (  
    <div>
      {country.name}
      <button value={country.name} onClick={handleShowCountryButton}>show</button>
    </div> 
  )
}

export default Country;