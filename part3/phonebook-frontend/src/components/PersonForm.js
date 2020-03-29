import PropTypes from 'prop-types';
import React from 'react';

const PersonForm = ({
  handleAddPersonSubmit,
  handleAddPersonNameInput,
  handleAddPersonNameInputChange,
  handleAddPersonNumberInput,
  handleAddPersonNumberInputChange
}) => (
  <form onSubmit={handleAddPersonSubmit}>
    <div>
      name:{' '}
      <input
        value={handleAddPersonNameInput}
        onChange={handleAddPersonNameInputChange}
      />
    </div>
    <div>
      number:{' '}
      <input
        value={handleAddPersonNumberInput}
        onChange={handleAddPersonNumberInputChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

PersonForm.propTypes = {
  handleAddPersonNameInput: PropTypes.string.isRequired,
  handleAddPersonNameInputChange: PropTypes.func.isRequired,
  handleAddPersonNumberInput: PropTypes.string.isRequired,
  handleAddPersonNumberInputChange: PropTypes.func.isRequired,
  handleAddPersonSubmit: PropTypes.func.isRequired
};

export default PersonForm;
