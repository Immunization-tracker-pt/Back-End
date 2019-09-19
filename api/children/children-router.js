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
router.post('/', (req, res) => {
    const child = req.body
    Children.add(child)
        .then(child => {
            res.status(201).json(child)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could add child to the server',
                dbError: error
            })
        })
})


module.exports = router