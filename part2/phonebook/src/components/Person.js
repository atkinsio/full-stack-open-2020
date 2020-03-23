import React from 'react';

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.phone}
    </div>
  );
}

export default Person;