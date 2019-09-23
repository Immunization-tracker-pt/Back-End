
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('doctors').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        {
          username: 'testdoctor',
          email: 'doctortest@test.com',
          password: 'test',
          name: 'Test Doctors Office'
        },
      ]);
    });
};
