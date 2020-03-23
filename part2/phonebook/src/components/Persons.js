import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
      {filteredPersons.map(person => <Person key={person.name} person={person} />)}
    </div>
  );
}

export default Persons;
