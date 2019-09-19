const router = require('express').Router()

const Parents = require('./parents-model.js')


router.get('/', (req, res) => {
    Parents.find()
        .then(parents => {
            res.status(200).json(parents)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not get parents from server',
                error: error
            })
        })
})

router.post('/', (req, res) => {
    const parent = req.body
    Parents.add(parent)
        .then(parent => {
            res.status(201).json(parent)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not add parent to server',
                error: error
            })
        })
})


module.exports = router