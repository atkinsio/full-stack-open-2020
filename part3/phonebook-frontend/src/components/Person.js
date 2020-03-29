import PropTypes from 'prop-types';
import React from 'react';

const Person = ({ person, handleDeletePersonButton }) => (
  <div>
    {person.name} {person.number}{' '}
    <button
      type="button"
      onClick={() => handleDeletePersonButton(person.id, person.name)}
    >
      delete
    </button>
  </div>
);

Person.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDeletePersonButton: PropTypes.func.isRequired
};

export default Person;
