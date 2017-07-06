const router = require('express').Router()
const passport = require('../auth/passport')
const { Post } = require('../database/queries')

router.get('/:postId', (req, res, next) => {
  const { postId } = req.params
  Post.getPostWithUserByPostId(postId, (error, data) => {
    res.render('post', {data , session: req.session})
  })
})

router.get('/:postId/:username/delete', (req, res, next) => {
  const { postId, username } = req.params
  Post.deletePostById(postId, (error, data) => {
    res.redirect(`/user/${username}`)
  })
})

router.get('/:cityName/:cityId/new_post', (req, res, next) => {
  const { cityName } = req.params
  res.render('new_post', {data: cityName, session: req.session})
})

router.post('/:cityName/:cityId/new_post', (req, res, next) => {
  const { cityName, cityId } = req.params
  const { title, content } = req.body
  const { user } =  req.session.passport
  Post.createPost( user, cityId, title, content, (error, data) => {
    res.redirect(`/city/${cityName}`)
  })
})

module.exports = router
