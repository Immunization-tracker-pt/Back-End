const router = require('express').Router()

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

module.exports = router