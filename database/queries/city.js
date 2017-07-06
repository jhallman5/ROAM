const knex = require('../knex.js')

const getCityWithPostsByName = (cityName, callback) => {
  knex('cities')
    .leftOuterJoin('posts', 'cities.id', '=', 'posts.cities_id')
    .leftOuterJoin('users', 'posts.user_id', '=', 'users.id')
    .where('cities.name', cityName)
    .select('name','username', 'cities.id AS cityId', 'title', 'content', 'posts.created_at AS created_at')
  .then((result, error) => {
    const returnedCity = {
                          name: result[0].name,
                          cityId: result[0].cityId,
                          posts: result.map(post => {
                            return { username: post.username,
                                    title: post.title,
                                    content: post.content,
                                    created_at: post.created_at
                                  }
                          })
    }
    callback(error, returnedCity)
  })
}

module.exports= {
  getCityWithPostsByName
}
