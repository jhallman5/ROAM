const bcrypt = require('bcrypt')

exports.seed = function(knex, Promise) {
  //Creates hashes for db storage
  const hashPassword = (password) => bcrypt.hashSync(password , 10, (error, hash) => hash )
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'jhallman5@gmail.com', username: 'jhallman5', password: hashPassword('test'), current_city: 'San Francisco'},
        {id: 2, email: 'steven@gmail.com', username: 'steven5', password: hashPassword('test2')},
        {id: 3, email: 'Thao@gmail.com', username: 'Ttran', password: hashPassword('test3'), current_city: 'San Jose'},
      ]);
    });
};
