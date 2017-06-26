
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'jhallman5@gmail.com', username: 'jhallman5', password: 'test'},
        {id: 2, email: 'steven@gmail.com', username: 'steven5', password: 'test2'},

      ]);
    });
};
