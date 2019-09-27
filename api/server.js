require('dotenv').config()
const express = require('express')

// MIDDLEWARE
const helmet = require('helmet')
const cors = require('cors')

// ROUTES

const testRouter = require('./test-routes/test-router.js')

const childrenRouter = require('./children/children-router.js')
const parentsRouter = require('./parents/parents-router.js')
const doctorsRouter = require('./doctors/doctors-router.js')
const immunizationsRouter = require('./immunizations/immunizations-router.js')
const pddRouter = require('./pdd/pdd-router.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

// ROUTES

server.use('/api/test', testRouter)

server.use('/api/children', childrenRouter)
server.use('/api/parents', parentsRouter)
server.use('/api/doctors', doctorsRouter)
server.use('/api/immunizations', immunizationsRouter)
server.use('/api/pdd', pddRouter)

server.get('/', (req, res) => {
    res.send(`Immunization Tracker Back-End API BW Unit 4 - Travis Little WebPT6`)
})





module.exports = server