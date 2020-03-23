import React from 'react';

const PersonForm = ({ handleSubmit, handleInput, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={handleInput} onChange={handleChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;