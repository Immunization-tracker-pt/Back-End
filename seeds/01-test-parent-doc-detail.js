
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parent_doctor_detail').del()
    .then(function () {
      // Inserts seed entries
      return knex('parent_doctor_detail').insert([
        {doctor_id: 2, parent_id: 1, permission_requested: 1, permission_granted: 1},
        {doctor_id: 3, parent_id: 1, permission_requested: 0, permission_granted: 0},
        {doctor_id: 1, parent_id: 1, permission_requested: 0, permission_granted: 0}        

      ]);
    });
};
