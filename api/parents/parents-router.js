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

        // const children = await Parents.getChildren(parent_id)
        
        // const immunizations = await Parents.getChildImmunizationData(parent_id)

        
   
    } catch (error) {
        res.status(401).json({
            message: 'Invalid credentials',
            error
        }) 
    }

    // Parents.findBy({ email })
    //     .first()
    //     .then(parent => {
    //         if(parent && bcrypt.compareSync(password, parent.password)) {
    //             const token = generateToken(parent)
    //             res.status(200).json({
    //                 message: `Logged in as ${parent.email}`,
    //                 token
    //             })
    //         } else {
    //             res.status(401).json({
    //                 message: 'Invalid credentials'
    //             })
    //         }
    //     })
    //     .catch(error => {
    //         res.status(500).json({
    //             message: 'There was an error with the authentication server.',
    //             dbError: error
    //         })
    //     })
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


module.exports = router