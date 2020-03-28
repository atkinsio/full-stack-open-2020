import PropTypes from 'prop-types';
import React from 'react';

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

Person.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Person;
