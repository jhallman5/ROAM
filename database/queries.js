const knex = require('./knex.js')

const findUserbyUsernameAndEmail = (username, email, callback) =>
  knex.select().from('users').where({ username: username})
    .then((result, error) => {
      callback(error, result[0])
    })

const findUserById = (id, callback) =>
  knex.select().from('users').where({id: id})
    .then((result, error) =>{
      callback(error, result[0])
    })

module.exports = {
  findUserbyUsernameAndEmail,
  findUserById,
}
