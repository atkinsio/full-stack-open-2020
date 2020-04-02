import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ content: null })

  const showNotification = (content, color = '#61dafb') => {
    if (content instanceof Error) {
      const errorMessage =
        content.response.data.errorMessage !== undefined
          ? content.response.data.errorMessage
          : 'Something went wrong!'
      setMessage({ content: errorMessage, color: 'red' })
      setTimeout(() => {
        setMessage({ content: null })
      }, 6000)
    } else {
      setMessage({ content, color })
      setTimeout(() => {
        setMessage({ content: null })
      }, 6000)
    }
  }

  const handleAddPersonSubmit = (event) => {
    const newPerson = { name, number }

    const matchingPersons = persons.filter(
      (person) => person.name === newPerson.name
    )

    event.preventDefault()

    if (matchingPersons.length > 0) {
      const confirmMessage = `"${matchingPersons[0].name}" is already added to the phonebook, would you like to update their contact number?`

      if (window.confirm(confirmMessage)) {
        personService
          .update(matchingPersons[0].id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )
            setName('')
            setNumber('')
            showNotification(`Updated "${returnedPerson.name}"`)
          })
          .catch((error) => {
            showNotification(error)
            setPersons(
              persons.filter((person) => person.id !== matchingPersons[0].id)
            )
          })
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setName('')
          setNumber('')
          showNotification(`Added "${returnedPerson.name}"`)
        })
        .catch((error) => showNotification(error))
    }
  }

  const handleAddPersonNameInputChange = (event) => setName(event.target.value)

  const handleAddPersonNumberInputChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => setFilter(event.target.value)

  const handleDeletePersonButton = (id, nameToBeDeleted) => {
    if (window.confirm(`Delete ${nameToBeDeleted}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          showNotification(`Deleted "${nameToBeDeleted}"`)
        })
        .catch((error) => {
          showNotification(error)
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <hr />
      <Notification message={message} />
      <Filter
        handleFilterInput={filter}
        handleFilterInputChange={handleFilterInputChange}
      />
      <h2>New Phonebook Entry</h2>
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
  )
}

export default App
