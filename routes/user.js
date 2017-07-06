const router = require('express').Router()
const passport = require('../auth/passport')
const { User } = require('../database/queries')

router.get('/profile', (req, res) => {
  const { user } = req.session.passport
  User.findUserById(user, (error, result) => {
    res.redirect(`/user/${result.username}`)
  })
})

router.get('/:username', (req, res) => {
  const { username } = req.params
  User.findUserWithPostsByUsername(username, (error, data) => {
    res.render('user_profile', {data, session: req.session})
  })
})

module.exports = router
