
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@puhelinluettelo.kima0.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  phone: process.argv[4],
})

Person.find({}).then(result => {
  if (person.name === undefined || person.phone === undefined) {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name, person.phone)
      mongoose.connection.close()
    })
  } else {
    person.save({ person }).then(persons => {
      console.log(`added ${persons.name} number ${persons.phone} to phonebook`)
      mongoose.connection.close()
    })
  }
})





