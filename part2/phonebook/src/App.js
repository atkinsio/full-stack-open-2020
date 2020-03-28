/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleAddPersonSubmit = (event) => {
    const newPerson = {
      name: newName,
      number: newNumber
    };

    event.preventDefault();

    if (persons.filter((person) => person.name === newPerson.name).length > 0) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    setNewName('');
    setNewNumber('');
  };

  const handleAddPersonNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddPersonNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleFilterInput={filter}
        handleFilterInputChange={handleFilterInputChange}
      />
      <h2>add a new</h2>
      <PersonForm
        handleAddPersonSubmit={handleAddPersonSubmit}
        handleAddPersonNameInput={newName}
        handleAddPersonNameInputChange={handleAddPersonNameInputChange}
        handleAddPersonNumberInput={newNumber}
        handleAddPersonNumberInputChange={handleAddPersonNumberInputChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
