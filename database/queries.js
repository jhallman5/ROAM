const knex = require('./knex.js')

const findUserbyUsernameAndEmail = (username, email, callback) => {
  console.log( "(>'')>  in queries" )
  knex.select().from('users').where({ username: username})
    .then((result, error) => {
      console.log( "=-=-=-> result", result )
      callback(error, result)
  })

}

module.exports = {
  findUserbyUsernameAndEmail,

}
