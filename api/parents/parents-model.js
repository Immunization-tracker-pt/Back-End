const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    getChildren,
    getParentDoctorData,
    getChildImmunizationData,
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

function getChildren(parent_id) {
    return db('children as c')
        .where('c.parent_id', parent_id)     
    
}

function getParentDoctorData(parent_id){
    return db('parent_doctor_detail as pdd')
        .join('doctors as d', 'pdd.doctor_id', '=', 'd.id')
        .select(`d.name as doctor_name`, `d.email as doctor_email`, 'pdd.permission_granted', 'pdd.permission_requested')
        .where('pdd.parent_id', parent_id)
}

function getChildImmunizationData(parent_id) {
    return db('immunizations as i')
        .join('children as c', 'i.child_id', '=', 'c.id')
        .select('*')
        .where('i.parent_id', parent_id)
}