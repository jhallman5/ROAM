const knex = require('../knex.js')

const findUserbyUsername = (username, callback) =>
  knex.select('*').from('users').where({ username: username})
    .then((result, error) => {
      callback(error, result[0])
    })

//finds user and then processes user to an object that the routes/views can easily use
const findUserWithPostsByUsername = (username, callback) => {
  knex('users')
    .leftOuterJoin('posts', 'users.id', 'posts.user_id')
    .leftOuterJoin('cities', 'posts.cities_id', 'cities.id')
    .where({ username: username})
    .select('username', 'users.id AS userId', 'current_city', 'email', 'users.created_at', 'posts.id', 'content', 'posts.created_at', 'cities.name')
  .then((result, error) => {
    const returnedUser = {
                          username: result[0].username,
                          userId: result[0].userId,
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
    if(!returnedUser.posts[0].id) {
      returnedUser.posts[0].content = "None... yet!"
    }
    callback(error, returnedUser)
  })
}

const findUserById = (id, callback) =>
  knex.select().from('users').where({id: id})
    .then((result, error) => {
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
