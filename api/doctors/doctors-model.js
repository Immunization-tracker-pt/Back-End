const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    getParentsWithDoctorId,
    getImmunizationsByDoctorId,
    getImmunizationsByChildId,
    getImmunizationsByParentId,
    requestPermission,
    revokePermissionRequest
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

function getParentsWithDoctorId(doctor_id) {
    return db('parent_doctor_detail as pdd')
        .join('parents as p', 'pdd.parent_id', '=', 'p.id')
        .select('p.id as parent_id', 'p.firstname', 'p.lastname', 'p.email', 'p.dob', 'p.street', 'p.city', 'p.state_province', 'p.phonenumber', 'p.permission_granted as PARENT_permission_granted', 'pdd.permission_granted', 'pdd.permission_requested')
        .where('pdd.doctor_id', doctor_id)
}

function requestPermission(parent_id, doctor_id) {
    return db('parent_doctor_detail')
        .where({parent_id, doctor_id})
        .update({
            permission_requested: 1
        })
        .then(() => {
            return db('parent_doctor_detail').where({parent_id, doctor_id})
        })
}

function revokePermissionRequest(parent_id, doctor_id) {
    return db('parent_doctor_detail')
        .where({parent_id, doctor_id})
        .update({
            permission_requested: 0
        })
        .then(() => {
            return db('parent_doctor_detail').where({parent_id, doctor_id})
        })
}
function getImmunizationsByDoctorId(doctor_id) {
    return db('immunizations').where({doctor_id})
}

function getImmunizationsByParentId(parent_id) {
    return db('immunizations').where({parent_id})
}

function getImmunizationsByChildId(child_id) {
    return db('immunizations').where({child_id})
}