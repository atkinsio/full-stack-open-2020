import PropTypes from 'prop-types'
import React from 'react'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: message.color,
    background: 'dimgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message.content === null) {
    return null
  }

  return <div style={notificationStyle}>{message.content}</div>
}

Notification.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired
}

export default Notification
