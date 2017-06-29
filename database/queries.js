const knex = require('./knex.js')

const findUserbyUsername = (username, callback) =>
  knex.select('*').from('users').where({ username: username})
    .then((result, error) => {
      callback(error, result[0])
    })

  const findUserWithPostsByUsername = (username, callback) =>
    knex('users')
      .join('posts', 'users.id', '=', 'posts.user_id')
      .join('cities', 'posts.cities_id', '=', 'cities.id')
      .where({ username: username})
      .select('username', 'current_city', 'email', 'users.created_at', 'posts.id', 'content','posts.created_at', 'cities.name')
    .then((result, error) => {
      const returnedUser = {
                            username: result[0].username,
                            current_city: result[0].current_city,
                            email: result[0].email,
                            created_at: result[0].created_at,
                            posts: result.map(post => {
                              return { id: post.id,
                                      city: post.name,
                                      content: post.content,
                                      created_at: post.created_at
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
