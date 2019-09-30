const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: 'Invalid session.' })
            } else {
                req.decodedToken = decodedToken
                if(decodedToken.type === 'parent') {
                    next()
                } else {
                    res.status(401).json({ message: 'Parent access required'})
                }
            }
        })
    } else {
        res.status(400).json({ message: 'No authenticiation credentials provided'})
    }
}