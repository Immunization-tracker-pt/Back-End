require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send(`Immunization Tracker Back-End API BW Unit 4 - Travis Little WebPT6`)
})





module.exports = server