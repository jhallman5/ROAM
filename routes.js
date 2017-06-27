const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/user/:username', (req, res) => {
  const username = req.params.username
  res.render('user_profile', {username})
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

module.exports = router
