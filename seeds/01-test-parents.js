
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents').del()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        {
          name: 'Smith Family',
          email: 'test@test.com',
          password: 'test'
        }
      ]);
    });
};