const express = require('express')
const router = express.Router()
const passport = require('passport')
const queries = require('./database/queries')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/user/:username', (req, res) => {
  const username = req.params.username
  queries.findUserWithPostsByUsername(username, (error, user) => {
    console.log( "=-=-=-> user", user )
    res.render('user_profile', {user})
  })
})

router.get('/sign_in', (req, res) => {
  res.render('sign_in')
})

router.get('/sign_up', (req, res) => {
  res.render('sign_up')
})

router.post('/sign_in', (req, res, next)  => {
  passport.authenticate('local', { successRedirect: `/user/${req.body.username}`,
                                   failureRedirect: '/sign_up'
  })(req, res, next)
})

router.post('/sign_up' , (req, res, next)  => {
  const {username, email, password} = req.body
  queries.addUser(username, email, password, () => {
    res.redirect(`/user/${username}`)
  })
})

module.exports = router
