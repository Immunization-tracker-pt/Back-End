
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents').del()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        {
          username: 'testfamily',
          email: 'test@test.com',
          password: 'test',

          firstname: 'Jack',
          middlename: 'Alex',
          lastname: 'Smith',
          gender: 'male',
          dob: '1980-09-19T21:01:23.369Z',
          street: '125 Address Way',
          city: 'A Big City',
          state_province: 'California',
          phonenumber: '555-555-1234'

        }
      ]);
    });
};
