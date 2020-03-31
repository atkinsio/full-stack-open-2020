import PropTypes from 'prop-types'
import React from 'react'

const Person = ({ person, handleDeletePersonButton }) => (
  <div>
    <strong>{person.name}</strong> {person.number} ---{' '}
    <button
      type="button"
      onClick={() => handleDeletePersonButton(person.id, person.name)}
    >
      <strong>Delete</strong>
    </button>
  </div>
)

Person.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDeletePersonButton: PropTypes.func.isRequired
}

export default Person
