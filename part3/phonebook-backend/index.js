require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

const morganFormat = (tokens, req, res) => {
  let format = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ]

  if (req.method === 'POST') {
    format = format.concat(JSON.stringify(req.body))
  }

  return format.join(' ')
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(morganFormat))

app.get('/info', (req, res, next) => {
  const timestamp = new Date()

  Person.countDocuments({}, (error, count) => {
    res.json({ info: `Phonebook contains ${count} people,`, timestamp })
  }).catch((error) => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ errorMessage: 'Person no longer exists' })
      } else {
        res.status(204).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { body } = req

  if (!body.name) {
    return res.status(400).json({ errorMessage: 'Name is required' })
  }

  if (!body.number) {
    return res.status(400).json({ errorMessage: 'Number is required' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  return person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req

  return Person.findOne({ _id: req.params.id }).then((personToBeUpdated) => {
    const person = personToBeUpdated
    person.name = body.name
    person.number = body.number

    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson.toJSON())
      })
      .catch((error) => next(error))
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ errorMessage: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ errorMessage: 'ID is malformed' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ errorMessage: error.message })
  }

  return next(error)
}

app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
