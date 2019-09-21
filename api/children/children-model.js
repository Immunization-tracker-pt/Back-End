const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('children')
}

function findBy(filter) {
    return db('children').where(filter)
}

function findById(id) {
    return db('children').where({id}).first()
}

function add(child) {
    return db('children').insert(child)
        .then(ids => {
            return findById(ids[0]) // returns the new child object
        })
}