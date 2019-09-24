
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('children').del()
    .then(function () {
      // Inserts seed entries
      return knex('children').insert([
        {
          parent_id: 1,
          fullname: 'Bobby Smith',
          dob: '2019-05-19T21:01:23.369Z',
        },
      ]);
    });
};
