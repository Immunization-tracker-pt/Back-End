require('dotenv').config()
const express = require('express')

// MIDDLEWARE
const helmet = require('helmet')
const cors = require('cors')

// ROUTES
const childrenRouter = require('./children/children-router.js')
const parentsRouter = require('./parents/parents-router.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

// ROUTES
server.use('/api/children', childrenRouter)
server.use('/api/parents', parentsRouter)

server.get('/', (req, res) => {
    res.send(`Immunization Tracker Back-End API BW Unit 4 - Travis Little WebPT6`)
})





module.exports = server