import React from 'react';

const Filter = ({ handleFilterInput, handleFilterInputChange }) => {
  return (
    <div>
      filter shown with <input value={handleFilterInput} onChange={handleFilterInputChange} />
    </div>
  );
}

export default Filter;
