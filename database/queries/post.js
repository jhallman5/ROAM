const knex = require('../knex.js')

const getPostWithUserByPostId = (postId, callback) =>
  knex('posts')
    .join('users', 'posts.user_id', '=', 'users.id')
    .join('cities', 'posts.cities_id', '=', 'cities.id')
    .where('posts.id', postId)
    .first('username','current_city','users.created_at AS member_since','cities.name AS city', 'content','posts.created_at')

const deletePostById = (postId, callback) =>
  knex('posts')
    .where('posts.id', postId)
    .del()

const createPost = (userId, citiesId, title, content, callback) =>
  knex('posts')
    .insert({
      user_id: userId,
      cities_id: citiesId,
      title: title,
      content: content
    })


module.exports = {
  getPostWithUserByPostId,
  deletePostById,
  createPost,
}
