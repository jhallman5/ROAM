const knex = require('./knex.js')

const findUserbyUsername = (username, callback) =>
  knex.select('*').from('users').where({ username: username})
    .then((result, error) => {
      callback(error, result[0])
    })

//finds user and then processes user to an object that the routes/views can easily use
const findUserWithPostsByUsername = (username, callback) => {
  knex('users')
    .fullOuterJoin('posts', 'users.id', 'posts.user_id')
    .fullOuterJoin('cities', 'posts.cities_id', 'cities.id')
    .where({ username: username})
    .select('username', 'current_city', 'email', 'users.created_at', 'posts.id','content','posts.created_at', 'cities.name')
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

const getPostWithUserByPostId = (postId, callback) =>
  knex('posts')
    .join('users', 'posts.user_id', '=', 'users.id')
    .join('cities', 'posts.cities_id', '=', 'cities.id')
    .where('posts.id', postId)
    .first('username','current_city','users.created_at AS member_since','cities.name AS city', 'content','posts.created_at')
  .then((result, error) => {
    callback(error, result)
  })

const deletePostById = (postId, callback) => {
  knex('posts')
    .where('posts.id', postId)
    .del()
  .then((result, error) => {
    callback(error, result)
  })
}

const getCityWithPostsByName = (cityName, callback) => {
  knex('cities')
    .fullOuterJoin('posts', 'cities.id', '=', 'posts.cities_id')
    .fullOuterJoin('users', 'posts.user_id', '=', 'users.id')
    .where('cities.name', cityName)
    .select('name','username', 'content', 'posts.created_at AS created_at')
  .then((result, error) => {
    const returnedCity = {
                          name: result[0].name,
                          posts: result.map(post => {
                            return { username: post.username,
                                    content: post.content,
                                    created_at: post.created_at
                                  }
                          })
    }
    callback(error, returnedCity)
  })
}

module.exports = {
  findUserbyUsername,
  findUserWithPostsByUsername,
  findUserById,
  addUser,
  getPostWithUserByPostId,
  deletePostById,
  getCityWithPostsByName,
}
