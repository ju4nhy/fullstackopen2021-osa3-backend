require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', function(request, response) {
  const persondata = JSON.stringify(request.body)
  return persondata
})

app.use(morgan(function (tokens, request, response) {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens.body(request, response, 'body')
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Puhelinluettelo</h1>')
})

// Hae puhelinluettelon kontaktit
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

// Hae puhelinluettelon tiedot
app.get('/info', (request, response, next) => {
  const requestTime = new Date().toString()
  Person.countDocuments({}).then(persons => {
    response.send(`<p>Puhelinluettelossa on tällä hetkellä ${persons} kontaktin tiedot</p> ${requestTime}`)
  })
    .catch(error => next(error))
})

// Hae kontaktin tiedot
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

// Poista kontakti
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Lisää kontakti puhelinluetteloon
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    phone: body.phone,
  })

  person.save().then(savedPerson => savedPerson.toJSON())
    .then(savedJSONFormattedPerson => {
      response.json(savedJSONFormattedPerson)
    })
    .catch(error => next(error))
})

// Päivitä kontaktin puhelinnumero
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    phone: body.phone,
  }
  Person.findByIdAndUpdate(request.params.id, person)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Käsitellään olemattomat osoitteet
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})