
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('doctors').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        {name: 'Dr Test Office MD', email: 'drtest@test.com', password: 'test'},
      ]);
    });
};
