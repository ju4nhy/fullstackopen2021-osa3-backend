require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

// 3.13: puhelinluettelo ja tietokanta, step1 DONE

// const password = process.argv[2]
// const url = `mongodb+srv://fullstack:${password}@puhelinluettelo.kima0.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

/*
Tehtävä 3.7
app.use(morgan('tiny'))
*/

/* TOINEN TOIMIVA TAPA
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', (request, response) => JSON.stringify(request.body || {}))
**********************/

morgan.token('body', function(request, response) {
  const persondata = JSON.stringify(request.body)
  return persondata
});

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

// Hae kontaktit
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error));
})

// Hae puhelinluettelon tiedot
app.get('/info', (request, response, next) => {
  const requestTime = new Date().toString()
  
  Person.countDocuments({}).then(persons => {
    response.send(`<p>Puhelinluettelossa on tällä hetkellä ${persons} kontaktin tiedot</p> ${requestTime}`);
  })
  .catch(error => next(error));
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

 /* if (body.name === undefined || body.phone === undefined) {
    return response.status(400).json({ error: 'Nimi tai puhelinnumero puuttuu' })
  }
  */

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

// Olemattomien osoitteiden käsittely
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

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


/*
let persons = [
  {
    id: 1,
    name: "Teemu Selänne",
    phone: "060-5080111"
  },
  {
    id: 2,
    name: "Saku Koivu",
    phone: "045-8899110"
  },
  {
    id: 3,
    name: "Ville Peltonen",
    phone: "050-1122234"
  },
  {
    id: 4,
    name: "Jere Lehtinen",
    phone: "055-5566771"
  }
]
*/

/*
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
*/


/*
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})
*/
/*
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})
*/
/*
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})
*/


/*
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})
*/


/*
app.post('/api/persons', (request, response) => {
  const person = {
    id: Math.floor(Math.random() * 1000),
    name: request.body.name,
    phone: request.body.phone
  }
  if (person.name === '' || person.phone === '') {
    return response.status(400).json({ 
      error: 'Nimi tai puhelinnumero puuttuu'
    })
  } else if (persons.map(p => p.name).includes(person.name)) {
    return response.status(409).json({ 
      error: 'Nimi löytyy jo puhelinluettelosta'
    })
  }
  persons = persons.concat(person)
  response.json(person)
})
*/