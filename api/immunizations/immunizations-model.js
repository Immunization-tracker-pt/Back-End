const db = require('../../data/dbConfig.js')
const initialImmunizations = require('../../data/initialImmunizations.js')

module.exports = {
    find,
    findBy,
    findById,
    findByChildId,
    add,
    addInitialImmunizations
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
    // console.log("CHECK THIS", init_immunizations)

    return db('immunizations').insert(init_immunizations)
        .then(data => {
            // console.log("does this happen", data)
            return findByChildId(child_id)
            
        })
}