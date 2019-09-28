const router = require('express').Router()

const Immunizations = require('./immunizations-model.js')


router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.get('/child/:id', async (req, res) => {
    const { id } = req.params
    try {
      const immunizations = await Immunizations.findByChildId(id)
      console.log('hi', immunizations)
      if(immunizations.length === 0) {
          res.status(404).json({ message: `No immunizations records found for child ${id}`})
      } else {
          res.status(200).json(immunizations)
      }
    } catch (error) {
        res.status(500).json({ message: `Error getting child immunizations with child id ${id}` })
    }
})

router.post('/', (req, res) => {
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