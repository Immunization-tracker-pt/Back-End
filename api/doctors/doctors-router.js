const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Doctors = require('./doctors-model')


router.get('/', (req, res) => {
    Doctors.find()
        .then(doctors => {
            res.status(200).json(doctors)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get doctors from server',
                dbError: error
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Doctors.findById(id)
        .then(doctor => {

            if(!doctor) {
                res.status(404).json({ message: `Could not find doctor with ID: ${id}`})
            }

            res.status(200).json(doctor)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get doctor from server',
                dbError: error
            })
        })
})

router.post('/', (req, res) => {
    const doctor = req.body
    Doctors.add(doctor)
        .then(doctor => {
            res.status(201).json(doctor)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not add doctor to server',
                dbError: error
            })
        })
})

router.post('/register', (req, res) => {
    let doctor = req.body
    const hash = bcrypt.hashSync(doctor.password, 4)
    doctor.password = hash

    Doctors.add(doctor)
        .then(savedDoctor => {
            const token = generateToken(savedDoctor)
            res.status(201).json({
                doctor: savedDoctor,
                token
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not register new doctor.',
                dbError: error
            })
        })
    
})

router.post('/login', (req, res) => {
    let { email, password } = req.body

    Doctors.findBy({ email })
        .first()
        .then(doctor => {
            if(doctor && bcrypt.compareSync(password, doctor.password)) {
                const token = generateToken(doctor)
                res.status(200).json({
                    message: `Logged in as ${doctor.email}`,
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
        username: user.email,
        type: 'doctor'
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router