const db = require('../../data/dbConfig.js')
const initialImmunizations = require('../../data/initialImmunizations.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    addChildren,
    getChildrenImmunizationsByChildId,
    deleteChildBy,
    deleteChildById
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

function addChildren(children, parent_id) {
    // console.log('childnre', children)
    const numOfChildren = children.length
    return db('children').insert(children)
        .then(() => {
            return db('children').orderBy('id', 'desc').limit(`${numOfChildren}`)
                .then(children => {
                    children.forEach(child => {
                        addInitialImmunizations(parent_id, child.id)
                    });
        })
        // .then( () => {
        //     console.log("DO WE GET HERE")
        //     return findBy({parent_id})
        // })
    })

    
        

}

function findByChildId(child_id) {
    
    return db('immunizations').where({child_id})
}


function addInitialImmunizations(parent_id, child_id) {
    let init_immunizations = []
    initialImmunizations.map(immunization => {
        init_immunizations.push({
            child_id, parent_id, name: immunization 
        })

    })

    return db('immunizations').insert(init_immunizations)
        .then(data => {
            // getChildrenImmunizationsByChildId(child_id)
            
        })
}

function getChildrenImmunizationsByChildId(child_id) {
    
    return db('children as c')
        .join('immunizations as i', 'i.child_id', '=', 'c.id' )
        .select('*')
        .where('c.id', child_id)
}

function getChildImmunizationsByParentId(parent_id) {
    return db('immunizations as i')
        .join('children as c', 'i.child_id', '=', 'c.id')
        .select('*')
        .where('i.parent_id', parent_id)
}

function deleteChildById(id){
    return db('children').where({id}).del()
}

function deleteChildBy(filter){
    return db('chilren').where({filter}).del()
}

