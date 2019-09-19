const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('parents')
}

function findBy(filter) {
    return db('parents').where(filter)
}

function findById(id) {
    return db('parents').where({id}).first()
}

function add(parent) {
    return db('parents').insert(parent)
        .then(ids => {
            return findById(ids[0])
        })
}