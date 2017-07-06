const express = require('express')
const preAuthRouter = express.Router()
const passport = require('../auth/passport')
const queries = require('../database/queries')
const bcrypt = require('bcrypt')

const loggedInSession = (req, res, next) => {
  if(req.session.passport) {
    queries.findUserById(req.session.passport.user, (error, user) => {
      res.redirect(`user/${user.username}`)
    })
  } else {
    next()
  }
}

preAuthRouter.get('/', loggedInSession, (req, res) => {
  res.render('index')
})

preAuthRouter.get('/sign_in', loggedInSession, (req, res) => {
  res.render('sign_in')
})

preAuthRouter.get('/sign_up', loggedInSession, (req, res) => {
  res.render('sign_up')
})

preAuthRouter.post('/sign_in', (req, res, next)  => {
  passport.authenticate('local', { successRedirect: `/user/${req.body.username}`,
                                   failureRedirect: '/sign_up'
  })(req, res, next)
})

preAuthRouter.post('/sign_up', (req, res, next)  => {
  const {username, email, password} = req.body
  bcrypt.hash(password, 10, (error, hash) => {
    queries.addUser(username, email, hash, () => {
      res.redirect(`/user/${username}`)
    })
  })
})

preAuthRouter.get('/log_out', (req, res) => {
  if(req.session.passport) {
    req.session.destroy(() => res.redirect('/sign_in') )
  }
})

module.exports = preAuthRouter
