const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('immunizations')
}

function findBy(filter) {
    return db('immunizations').where(filter)
}

function findById(id) {
    return db('immunizations').where({id}).first()
}

function add(immunization) {
    return db('immunizations').insert(immunization)
        .then(ids => {
            return findById(ids[0])
        })
}