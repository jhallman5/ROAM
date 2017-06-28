const knex = require('./knex.js')

const findUserbyUsername = (username, callback) =>
  knex.select('*').from('users').where({ username: username})
    .then((result, error) => {
      callback(error, result[0])
    })

  const findUserWithPostsByUsername = (username, callback) =>
    knex('users')
      .join('posts', 'users.id', '=', 'posts.user_id')
      .select('username', 'current_city', 'email', 'posts.id', 'content', 'cities_id')
      .where({ username: username})
    .then((result, error) => {
      const returnedUser = {
                            username: result[0].username,
                            current_city: result[0].current_city,
                            email: result[0].email,
                            posts: result.map(post => {
                              return { id: post.id,
                                      content: post.content
                                    }
                            })

      }
      callback(error, returnedUser)
    })

const findUserById = (id, callback) =>
  knex.select().from('users').where({id: id})
    .then((result, error) =>{
      callback(error, result[0])
    })

    const addUser = (username, email, password, callback) => {
      knex.select().from('users').where({ username: username})
        .then((result, error) => {
          if(!result.length){
            return knex('users')
            .returning('*')
            .insert({
              email: email,
              username: username,
              password: password
            })
          }
        })
        .then(() => {
          callback()
        })
}

module.exports = {
  findUserbyUsername,
  findUserWithPostsByUsername,
  findUserById,
  addUser,
}
