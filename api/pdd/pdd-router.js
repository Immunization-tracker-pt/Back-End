const router = require('express').Router()
const Doctors = require('../doctors/doctors-model.js')
const Parents = require('../parents/parents-model.js')

const restricted = require('../../auth/auth-middleware.js') // does not check for type of user


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
        if(pdd.length === 0) {
            res.status(404).json({ message: `Could not find a Parent Doctor Detail with ID: ${id}`})
        } else {
            res.status(200).json(pdd)
        }
        

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
        if(pdd.length === 0) {
            res.status(404).json({ message: `Could not find a Parent Doctor Detail with parent ID: ${id}`})
        } else {
            res.status(200).json(pdd)
        }
        

    } catch (error) {
        res.status(500).json({
            message: `Error getting Parent Doctor Detail record from server ID: ${id}`
        })
    }
})

router.get('/doctor/:id', async (req, res) => {
    const { id } = req.params
    try {
        const pdd = await Doctors.findPDDByDocId(id)
        if(pdd.length === 0) {
            res.status(404).json({ message: `Could not find a Parent Doctor Detail with doctor ID: ${id}`})
        } else {
            res.status(200).json(pdd)
        }
        

    } catch (error) {
        res.status(500).json({
            message: `Error getting Parent Doctor Detail record from server ID: ${id}`
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

router.delete('/:parent_id/:doctor_id', restricted, async (req, res) => {
    const { parent_id, doctor_id } = req.params
    try {
        const delPPDCount = await Parents.deletePDD(parent_id, doctor_id)
        if(delPPDCount === 0) {
            res.status(404).json({ message: `Could not find a record with parent_id: ${parent_id} and doctor_id: ${doctor_id}`})
        } else {
            res.status(200).json(delPPDCount)
        }
          
    } catch (error) {
        res.status(500).json({ message: `Error deleting PPD from server` })
    }
})

module.exports = router