import React from 'react';

const PersonForm = (
    { handleAddPersonSubmit,
      handleAddPersonNameInput,
      handleAddPersonNameInputChange,
      handleAddPersonPhoneInput,
      handleAddPersonPhoneInputChange }
  ) => {
  return (
    <form onSubmit={handleAddPersonSubmit}>
      <div>
        name: <input value={handleAddPersonNameInput} onChange={handleAddPersonNameInputChange} />
      </div>
      <div>
        number: <input value={handleAddPersonPhoneInput} onChange={handleAddPersonPhoneInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;