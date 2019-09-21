const router = require('express').Router()
const Children = require('./children-model.js')

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



module.exports = router