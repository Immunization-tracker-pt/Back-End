const db = require('../../data/dbConfig.js')
const initialImmunizations = require('../../data/initialImmunizations.js')

module.exports = {
    find,
    findBy,
    findById,
    findByChildId,
    add,
    addInitialImmunizations,
    deleteImmunizationBy,
    deleteImmunizationById
}

function find() {
    return db('immunizations')
}

function findBy(filter) {
    return db('immunizations').where(filter)
}

function findById(id) {
    return db('immunizations').where({id})
}

function findByChildId(child_id) {
    
    return db('immunizations').where({child_id})
}

function add(immunization) {
    return db('immunizations').insert(immunization)
        .then(ids => {
            return findById(ids[0])
        })
}

function addInitialImmunizations(parent_id, child_id) {
    let init_immunizations = []
    initialImmunizations.map(immunization => {
        return init_immunizations.push({
            child_id, parent_id, name: immunization 
        })
    })

    return db('immunizations').insert(init_immunizations)
        .then(data => {
            return findByChildId(child_id)
            
        })
}

function deleteImmunizationById(id) {
    return db('immunizations').where({id}).del()
}

function deleteImmunizationBy(filter) {
    return db('immunizations').where(filter).del()
}