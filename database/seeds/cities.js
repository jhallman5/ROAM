exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        { name: 'San Francisco' },
        { name: 'Oakland' },
        { name: 'Santa Cruz' },
      ]);
    });
};
