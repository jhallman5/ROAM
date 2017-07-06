const router = require('express').Router()
const passport = require('../auth/passport')
const queries = require('../database/queries')

router.get('/:postId', (req, res, next) => {
  const { postId } = req.params
  queries.getPostWithUserByPostId(postId, (error, data) => {
    res.render('post', {data , session: req.session})
  })
})

router.get('/:postId/:username/delete', (req, res, next) => {
  const { postId, username } = req.params
  queries.deletePostById(postId, (error, data) => {
    res.redirect(`/user/${username}`)
  })
})

module.exports = router
