const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0.fkubm.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  const person = new Person(
      {
          name: 'HTML',
          number: 08023456789
      },
  )

  
  Person.find({}).then(result => {
      result.forEach(person => {
          console.log(person)
      })
      mongoose.connection.close()
  })
  
//   person.save().then(result => {
//     console.log('person saved!')
//     mongoose.connection.close()
//   })