import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: '39-44-5323523'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
        handleAddPersonSubmit={handleAddPersonSubmit}
        handleAddPersonNameInput={newName} 
        handleAddPersonNameInputChange={handleAddPersonNameInputChange} 
        handleAddPersonPhoneInput={newPhone} 
        handleAddPersonPhoneInputChange={handleAddPersonPhoneInputChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
}


export default App;
