
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents').del()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        {
          email: 'newfamily2@email.com',
          password: '$2a$04$SYYxMrfTdhcXse/yy1s4WugDgBkCgItj.SJ.NudU0TzsOK.WMPUyu',
          firstname: 'Jack',
          lastname: 'Smith',
          dob: '1980-09-19T21:01:23.369Z',
          street: '125 Address Way',
          city: 'A Big City',
          state_province: 'California',
          phonenumber: '555-555-1234',
          permission_granted: 0,
        },
      ]);
    });
};

