const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const restricted = require('../../auth/auth-middleware.js')

const Parents = require('./parents-model.js')


router.get('/', restricted, (req, res) => {
    Parents.find()
        .then(parents => {
            res.status(200).json(parents)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get parents from server',
                dbError: error
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Parents.findById(id)
        .then(parent => {

            if(!parent) {
                res.status(404).json({ message: `Could not find parent with ID: ${id}`})
            }

            res.status(200).json(parent)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get parent from server',
                dbError: error
            })
        })
})

router.post('/', (req, res) => {
    const parent = req.body
    Parents.add(parent)
        .then(parent => {
            res.status(201).json(parent)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not add parent to server',
                dbError: error
            })
        })
})

router.post('/register', (req, res) => {
    let parent = req.body
    const hash = bcrypt.hashSync(parent.password, 4)
    parent.password = hash

    Parents.add(parent)
        .then(savedParent => {
            const token = generateToken(savedParent)
            res.status(201).json({
                parent: savedParent,
                token
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not register new parent.',
                dbError: error
            })
        })
    
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Parents.findBy({ username })
        .first()
        .then(parent => {
            if(parent && bcrypt.compareSync(password, parent.password)) {
                const token = generateToken(parent)
                res.status(200).json({
                    message: `Logged in as ${parent.username}`,
                    token
                })
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'There was an error with the authentication server.',
                dbError: error
            })
        })
})


function generateToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}


module.exports = router