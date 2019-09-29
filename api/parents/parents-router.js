const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const restricted = require('../../auth/auth-middleware.js')

const Parents = require('./parents-model.js')


router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.get('/:id/doctors', async (req, res)  => {
    const { id } = req.params

    try {
        const doctors = await Parents.getParentDoctorData(id)
        res.status(200).json({
            message: 'Hello', 
            doctors: doctors
        })

    } catch (error) {
        res.status(500).json({ 
            message: `Could not get doctors related to parents with id: ${id}`,
            dbError: error
        })
    }

    
})

router.get('/:id/children', async (req, res) => {
    const { id } = req.params

    try {
        const children = await Parents.getChildren(id)
        res.status(200).json(children)

    } catch (error) {
        res.status(500).json({ 
            message: `Could not get children related to parents with id: ${id}`,
            dbError: error
        })
    }
})

router.post('/register', (req, res) => {
    let parent = req.body
    const hash = bcrypt.hashSync(parent.password, 4)
    parent.password = hash

    Parents.add(parent)
        .then(savedParent => {
            const token = generateToken(savedParent)
            res.status(201).json({
                parent: savedParent,
                token
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not register new parent.',
                dbError: error
            })
        })
    
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body

    try {
        const parent = await Parents.findBy({email}).first()

        if (parent && bcrypt.compareSync(password, parent.password)) {
            const token = generateToken(parent)
            const doctors = await Parents.getParentDoctorData(parent.id)
            const children = await Parents.getChildren(parent.id)
            const immunizations = await Parents.getChildImmunizationData(parent.id)
            
            res.status(200).json({
                message: `Welcome ${parent.firstname}!`,
                token,
                parent,
                children,
                doctors,
                immunizations
            })
            
        } else {
            res.status(500).json({
                message: "Error logging in",
                dbError: error
            })
        }
        
   
    } catch (error) {
        res.status(401).json({
            message: 'Invalid credentials',
            error
        }) 
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Parents.deleteParentById(id)
        if(!result) {
            res.status(404).json({ message: `Could not find parent with id: ${id}`} )
        } else {
            res.status(200).json(result)
        }
    } catch(error) {
        res.status(500).json({ message: `Error deleting parent with id ${id}` })
    }
})


function generateToken(user) {
    const payload = {
        sub: user.id,
        username: user.email,
        type: 'parent'
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

router.post('/new', async (req, res) => {
    // Expects a parent object, with an array of children
    const { parent, children } = req.body
    try {
        const newFamily = await Parents.addParentWithChildren(parent, children) // addParentWithChildren creates the parent, their children, as well as preset immunization reocrds.
        res.status(201).json({
            message: "Successful",
            data: newFamily
        })
    }
    catch (error) {
        res.status(500).json({ message: "error", error})
    }
})



module.exports = router