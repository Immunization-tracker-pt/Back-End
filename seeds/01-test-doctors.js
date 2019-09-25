
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('doctors').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        {
          email: 'doctortest@test.com',
          password: 'test',
          name: 'Test Doctors Office',
        },
        {
          email: 'newdoctortest@test.com',
          password: 'test',
          name: 'New Doctors Office1'
        },
        {
          email: 'newdoctortest1@test.com',
          password: '$2a$04$wVSz0GVUQ3.UY9tEkOqn9ewN.v7jG.0WJiyoHgnMtXxcP.sNbwG.W',
          name: 'New Doctors Office2'
        }
        
      ]);
    });
};