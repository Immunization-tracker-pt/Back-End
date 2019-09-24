// These routes are intended for used temporarily until FE team has got their app working with end points with authenticication

const router = require('express').Router()

const Children = require('../children/children-model.js')
const Parents = require('../children/children-model.js')
const Doctors = require('../doctors/doctors-model.js')
const Immunizations = require('../immunizations/immunizations-model.js')

// PARENTS

router.get('/parents', (req, res) => {
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

router.get('/parents/:id', (req, res) => {
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

router.post('/parents', (req, res) => {
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

// CHILDREN

router.get('/children', (req, res) => {
    Children.find()
        .then(children => {
            res.status(200).json(children)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get children from server',
                dbError: error
            })
        })
})

router.get('/children/:id', (req, res) => {
    const { id } = req.params

    Children.findById(id)
        .then(child => {

            if(!child) {
                res.status(404).json({ message: `Could not find child with ID: ${id}`})
            }

            res.status(200).json(child)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get child from server',
                dbError: error
            })
        })
})

router.post('/children', (req, res) => {
    const child = req.body
    Children.add(child)
        .then(child => {
            res.status(201).json(child)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not add child to the server',
                dbError: error
            })
        })
})

// DOCTORS

router.get('/doctors', (req, res) => {
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

router.get('/doctors/:id', (req, res) => {
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

router.post('/doctors', (req, res) => {
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

// IMMUNIZATIONS

router.get('/immunizations', (req, res) => {
    Immunizations.find()
        .then(immunizations => {
            res.status(200).json(immunizations)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get immunizations from server',
                dbError: error
            })
        })
})

router.get('/immunizations/:id', (req, res) => {
    const { id } = req.params

    Immunizations.findById(id)
        .then(immunization => {

            if(!immunization) {
                res.status(404).json({ message: `Could not find immunization with ID: ${id}`})
            }

            res.status(200).json(immunization)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get immunization from server',
                dbError: error
            })
        })
})

router.post('/immunizations', (req, res) => {
    const immunization = req.body
    Immunizations.add(immunization)
        .then(immunization => {
            res.status(201).json(immunization)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not add immunization to server',
                dbError: error
            })
        })
})


module.exports = router