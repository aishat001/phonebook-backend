const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())  

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }


  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  app.use(requestLogger)

app
    .get('/api/persons', (req, res) => {
        Person.find({}).then(persons => {
            console.log(persons)
            res.json(persons)
        })
    })

app
    .get('/api/info', (req, res) => {
                const date = new Date();
             res.send(`Phone has info for ${persons.length} people <br/> <br/>${date}`)
    })

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                console.log(person)
                res.json(person)
              } else {
                  res.status(400).end()
              }
        })
        .catch(error => {
            console.log(error)
            response.status(500).end({ error: 'malformatted id'})          
        })
    })


 app.post('/api/persons', (req, res) => {
        const body = req.body
        if(!body.name || !body.number) {
            return res.status(406).json({
                error: "The name or number is missing"
            })
         } else  {
        const person = new Person({
            name: body.name,
            number: body.number
    
        })
        person.save()
            .then(savedPerson => {
                res.json(savedPerson)
            })
    }
   
 })  
    
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    person = persons.filter(person => person.id !== id)
    
    res.status(204).end()
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  app.use(errorHandler)
  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})