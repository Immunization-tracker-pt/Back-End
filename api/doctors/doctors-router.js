const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Doctors = require('./doctors-model')
const Parents = require('../parents/parents-model.js')


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



router.get('/parent/:id', async (req, res) => {
    const { id } = req.params
    try {
        const parents = await Doctors.getParentsWithDoctorId(id)
        if(parents.length < 1) {
            res.status(404).json({ message: `Could not find parents related to doctor_id: ${id}`})
        }
        res.status(200).json(parents)

    } catch (error) {
        res.status(500).json({ message: `Error getting parent doctor data with ID: ${id}`})
    }

})

router.get('/immunizations/doctor/:id', async (req, res) => {
    const { id } = req.params
    try {
        const immunizations = await Doctors.getImmunizationsByDoctorId(id)
        if(immunizations.length < 1) {
            res.status(404).json({
                message: `Could not find immunizations with doctor id: ${id}`
            })
        }
        res.status(200).json(immunizations)
    } catch(error) {
        res.status(500).json({ message: `Could not get immunizations for doctor id: ${id}`})
    }
})

router.put('/request-permission/:doctor_id/:parent_id/', async (req, res) => {
    const { doctor_id, parent_id } = req.params
    try {
        const request = await Doctors.requestPermission(parent_id, doctor_id)
        res.status(200).json({
            message: `Requested permission to edit account for parent ${parent_id}`,
            updatedParentDoctorDetail: request
        })
    } catch (error) {
        res.status(500).json({ message: `There was an error with the server requesting permission to edit parent ${parent_id}`, error})
    }
})

router.put('/revoke-request-permission/:doctor_id/:parent_id/', async (req, res) => {
    const { doctor_id, parent_id } = req.params
    try {
        const request = await Doctors.revokePermissionRequest(parent_id, doctor_id)
        res.status(200).json({
            message: `Revoking request to edit parent: ${parent_id}`,
            updatedParentDoctorDetail: request
        })
    } catch (error) {
        res.status(500).json({ message: `There was an error with the server revoking request to edit parent ${parent_id}`, error})
    }
})

// --------------------FIX THIS
// router.get('/immunizations/parent/:id', async (req, res) => {
//     const { id } = req.params
//     try {
//         const immunizations = await Doctors.getImmunizationsByParentId(id)
//         if(immunizations.length < 1) {
//             res.status(404).json({
//                 message: `Could not find immunizations with parent id: ${id}`
//             })
//         }
//     } catch(error) {
//         res.status(500).json({ message: `Could not get immunizations for parent id: ${id}`})
//     }
// })

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