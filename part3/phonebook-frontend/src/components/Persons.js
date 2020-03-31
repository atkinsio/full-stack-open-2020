import PropTypes from 'prop-types'
import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, handleDeletePersonButton }) => {
  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDeletePersonButton={handleDeletePersonButton}
        />
      ))}
    </div>
  )
}

Persons.propTypes = {
  filter: PropTypes.string.isRequired,
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeletePersonButton: PropTypes.func.isRequired
}

export default Persons
