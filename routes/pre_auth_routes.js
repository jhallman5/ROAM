const express = require('express')
const preAuthRouter = express.Router()
const passport = require('../auth/passport')
const queries = require('../database/queries')

const loggedInSession = (req, res, next) => {
  if(req.session.passport) {
    res.redirect('/user/jhallman5')
  } else {
    next()
  }
}

preAuthRouter.get('/', (req, res) => {
  res.render('index')
})

preAuthRouter.get('/sign_in', (req, res) => {
  res.render('sign_in')
})

preAuthRouter.get('/sign_up', (req, res) => {
  res.render('sign_up')
})

preAuthRouter.post('/sign_in', (req, res, next)  => {
  passport.authenticate('local', { successRedirect: `/user/${req.body.username}`,
                                   failureRedirect: '/sign_up'
  })(req, res, next)
})

preAuthRouter.post('/sign_up', (req, res, next)  => {
  const {username, email, password} = req.body
  queries.addUser(username, email, password, () => {
    res.redirect(`/user/${username}`)
  })
})
module.exports = preAuthRouter
