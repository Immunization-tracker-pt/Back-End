
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('children').del()
    .then(function () {
      // Inserts seed entries
      return knex('children').insert([
        {
          fullname: 'Bobby Smith',
          parent_id: 1
        },
      ]);
    });
};
