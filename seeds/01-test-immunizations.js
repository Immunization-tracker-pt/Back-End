
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('immunizations').del()
    .then(function () {
      // Inserts seed entries
      return knex('immunizations').insert([
        {child_id: 1, doctor_id: 1, name: 'Measels Vaccine', date_administered: '2019-09-19T21:01:23.369Z', location: 'Right arm' },
      ]);
    });
};
