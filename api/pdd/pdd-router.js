const router = require('express').Router()
const Doctors = require('../doctors/doctors-model.js')


router.get('/', async (req, res) => {
    try {
        const pdds = await Doctors.getAllParentDoctorDetails()
        res.status(200).json(pdds)

    } catch (error) {
        res.status(500).json({ message: 'Error getting Parent Doctor Detail records from server'})
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const pdd = await Doctors.findPDDById(id)
        res.status(200).json(pdd)

    } catch (error) {
        res.status(500).json({
            message: `Error getting Parent Doctor Detail record from server ID: ${id}`
        })
    }
})

router.get('/parent/:id', async (req, res) => {
    const { id } = req.params
    try {
        const pdd = await Doctors.findPDDByParentId(id)
        res.status(200).json(pdd)

    } catch (error) {
        res.status(500).json({
            message: `Error getting Parent Doctor Detail record from server parent ID: ${id}`
        })
    }
})

router.get('/doctor/:id', async (req, res) => {
    const { id } = req.params
    try {
        const pdd = await Doctors.findPDDByDocId(id)
        res.status(200).json(pdd)

    } catch (error) {
        res.status(500).json({
            message: `Error getting Parent Doctor Detail record from server doctor ID: ${id}`
        })
    }
})

router.post('/:parent_id/:doctor_id', async (req, res) => {
    const { doctor_id, parent_id } = req.params
    try {
        const newPPD = await Doctors.createDoctorParentRelationship(parent_id, doctor_id)
        if(!newPPD) {
            res.status(400).json({message: `Parent Doctor relationship already exists`})
        } else {
            res.status(201).json({
                message: "Relationship created",
                parent_doctor_relationship_id: newPPD
            })
        }
    
    } catch (error) {
        res.status(500).json({
            message: 'Error occurred with server creating Parent Doctor relationship'
        })
    }

})

module.exports = router