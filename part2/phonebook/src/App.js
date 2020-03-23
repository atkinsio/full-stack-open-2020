import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const handleAddPersonSubmit = (event) => {
    const person = {
      name: newName,
      phone: newPhone
    };

    event.preventDefault();
    persons.some((persons) => persons.name === person.name)
      ? alert(`${person.name} is already added to phonebook`) 
      : setPersons(persons.concat(person));
    setNewName('');
    setNewPhone('');
  };

  const handleAddPersonNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddPersonPhoneInputChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={filter} handleFilterInputChange={handleFilterInputChange} />
      <h2>add a new</h2>
      <PersonForm 
        handleAddPersonSubmit={handleAddPersonSubmit}
        handleAddPersonNameInput={newName} 
        handleAddPersonNameInputChange={handleAddPersonNameInputChange} 
        handleAddPersonPhoneInput={newPhone} 
        handleAddPersonPhoneInputChange={handleAddPersonPhoneInputChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
}


export default App;
