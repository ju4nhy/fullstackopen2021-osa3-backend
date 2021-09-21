const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

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

app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo</h1>')
})
  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const requestTime = new Date().toString()
  response.send('<div><p>Puhelinluettelossa on tällä hetkellä ' + persons.length + ' kontaktin tiedot</p></div>' + requestTime)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})