const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('doctors')
}

function findBy(filter) {
    return db('doctors').where(filter)
}

function findById(id) {
    return db('doctors').where({id}).first()
}

function add(doctor) {
    return db('doctors').insert(doctor)
        .then(ids => {
            return findById(ids[0])
        })
}