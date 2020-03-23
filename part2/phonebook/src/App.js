import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleAddPersonSubmit = (event) => {
    const person = { name: newName };

    event.preventDefault();
    setPersons(persons.concat(person));
    setNewName('');
  };

  const handleAddPersonInputChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm handleSubmit={handleAddPersonSubmit} handleInput={newName} handleChange={handleAddPersonInputChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
}


export default App;
