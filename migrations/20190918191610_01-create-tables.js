
exports.up = function(knex) {
    return knex.schema
    .createTable('parents', parents => {
        parents.increments()
        parents.string('name', 128).notNullable()
        parents.string('email', 128).notNullable().unique()
        parents.string('password', 128).notNullable()
    })
    .createTable('children', children => {
        children.increments()
        children.integer('parent_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('parents')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        children.string('fullname').notNullable()
    })
    .createTable('doctors', doctors => {
        doctors.increments()
        doctors.string('name', 255).notNullable()
        doctors.string('email').notNullable().unique()
        doctors.string('password', 128).notNullable()
    })
    .createTable('immunizations', immunizations => {
        immunizations.increments()
        immunizations.integer('child_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('children')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        immunizations.integer('doctor_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('doctors')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        immunizations.string('name', 255).notNullable()
        immunizations.string('date_administered', 255).notNullable()
        immunizations.string('location', 255).notNullable()
    })
    .createTable('parent_doctor_detail', pdd => {
        pdd.increments()
        pdd.integer('doctor_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('doctors')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        pdd.integer('parent_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('parents')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        pdd.integer('permission_requested').notNullable().unsigned()
        pdd.integer('permission_granted').notNullable().unsigned()
    })

  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('parent_doctor_detail')
        .dropTableIfExists('immunizations')
        .dropTableIfExists('doctors')
        .dropTableIfExists('children')
        .dropTableIfExists('parents')
};