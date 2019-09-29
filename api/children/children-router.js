const router = require('express').Router()
const Children = require('./children-model.js')
const Immunizations = require('../immunizations/immunizations-model.js')

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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


router.post('/:id/children/immunizations', async (req, res) => {
    const children = req.body
    const parent_id = req.params.id

    try {
        const savedChildren = await Children.addChildren(children, parent_id)
        const immunizations = await Immunizations.findBy({parent_id})
        res.status(200).json({
            children: savedChildren,
            immunizations
        })

    } catch(error) {
        res.status(500).json({error})

    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Children.deleteChildById(id)
        if(!result) {
            res.status(404).json({ message: `Could not find child with id: ${id}`} )
        } else {
            res.status(200).json(result)
        }
    } catch(error) {
        res.status(500).json({ message: `Error deleting child with id ${id}` })
    }
})



module.exports = router