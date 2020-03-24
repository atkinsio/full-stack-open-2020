import React from 'react';

const PersonForm = (
    { handleAddPersonSubmit,
      handleAddPersonNameInput,
      handleAddPersonNameInputChange,
      handleAddPersonNumberInput,
      handleAddPersonNumberInputChange }
  ) => {
  return (
    <form onSubmit={handleAddPersonSubmit}>
      <div>
        name: <input value={handleAddPersonNameInput} onChange={handleAddPersonNameInputChange} />
      </div>
      <div>
        number: <input value={handleAddPersonNumberInput} onChange={handleAddPersonNumberInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;