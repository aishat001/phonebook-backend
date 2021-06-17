const express = require('express')
const nodemon = require('nodemon')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// morgan(function (persons, req, res) {
//     return [
//         persons.method(req, res),
//         persons.url(req, res),
//         persons.status(req, res),
//         persons.res(req, res, 'content-length'), '-',
//         persons['response-time'](req, res), 'ms'
//     ].join(' ')
//   })
  
let persons = [
    {
        id: 1,
        name:"ibraheem",
        number: "08090000"
    },
    {
        id: 2,
        name:"aishat",
        number: "080908990"
    },
    {
        id: 3,
        name:"azeez",
        number: "080908770"
    },
    {
        id: 4,
        name:"azeezfgh",
        number: "0809087706"
    }
]

app
    .get('/api/persons', (req, res) => {
        res.json(persons)
        console.log(persons)
    })

app
    .get('/api/info', (req, res) => {
                const date = new Date();
             res.send(`Phone has info for ${persons.length} people <br/> <br/>${date}`)
    })

app.get('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        const person = persons.find(person => person.id === id)
      console.log(person)
      if (person) {
        res.json(person)
      } else {
          res.status(400).end()
      }

    })

    const generateId = id => {
        const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
        return maxId + 1
    }
 app.post('/api/persons', (req, res) => {
        const body = req.body
        if(!body.name || !body.number) {
            return res.status(406).json({
                error: "The name or number is missing"
            })
         } else if (persons.find(person => person.name.includes(body.name) === true)) {
    
        return res.status(405).json({
            error: "the name already exist"
        })
    } else  {
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number
    
        }

        persons = persons.concat(person)
        res.json(persons)
    }
   
 })  
    
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    
    res.status(204).end()
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})