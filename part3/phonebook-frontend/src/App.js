import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ content: null });

  const showNotification = (content, color = 'green') => {
    setMessage({ content, color });
    setTimeout(() => {
      setMessage({ content: null });
    }, 5000);
  };

  const handleAddPersonSubmit = (event) => {
    const newPerson = { name, number };
    const existingPerson = persons.filter(
      (person) => person.name === newPerson.name
    );

    event.preventDefault();

    if (existingPerson.length > 0) {
      if (
        confirm(
          `${existingPerson[0].name} is already added to the phonebook, would you like to update their contact number?`
        )
      ) {
        personService
          .update(existingPerson[0].id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setName('');
            setNumber('');
            showNotification(`Updated ${returnedPerson.name}`);
          })
          .catch(() => {
            showNotification(
              `Error: ${existingPerson[0].name} already deleted`,
              'red'
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson[0].id)
            );
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setName('');
        setNumber('');
        showNotification(`Added ${returnedPerson.name}`);
      });
    }
  };

  const handleAddPersonNameInputChange = (event) => setName(event.target.value);

  const handleAddPersonNumberInputChange = (event) =>
    setNumber(event.target.value);

  const handleFilterInputChange = (event) => setFilter(event.target.value);

  const handleDeletePersonButton = (id, nameToBeDeleted) => {
    if (confirm(`Delete ${nameToBeDeleted}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${nameToBeDeleted}`);
        })
        .catch(() => {
          showNotification(`Error: ${nameToBeDeleted} already deleted`, 'red');
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        handleFilterInput={filter}
        handleFilterInputChange={handleFilterInputChange}
      />
      <h2>add a new</h2>
      <PersonForm
        handleAddPersonSubmit={handleAddPersonSubmit}
        handleAddPersonNameInput={name}
        handleAddPersonNameInputChange={handleAddPersonNameInputChange}
        handleAddPersonNumberInput={number}
        handleAddPersonNumberInputChange={handleAddPersonNumberInputChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDeletePersonButton={handleDeletePersonButton}
      />
    </div>
  );
};

export default App;
