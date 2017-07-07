const router = require('express').Router()
const passport = require('../auth/passport')
const { User } = require('../database/queries')

router.get('/profile', (req, res) => {
  const { user } = req.session.passport
  User.findUserById(user, (error, result) => {
    res.redirect(`/user/${result.username}`)
  })
})

router.get('/update_user', (req, res) => {
  res.render('update_user', { data: req.user, session: req.session })
})

router.post('/update_user', (req, res) => {
  User.updateUser(req.body.username, req.body.email, req.body.password)
  .then( (result) => {
    console.log( "=-=-=-> result", result )
  res.redirect(`/user/${result.username}`)
})
})

router.get('/:username', (req, res) => {
  const { username } = req.params
  User.findUserWithPostsByUsername(username)
  .then( data =>
    res.render('user_profile', {data, session: req.session} )
  )
})

module.exports = router
