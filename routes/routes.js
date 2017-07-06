const express = require('express')
const router = express.Router()
const passport = require('../auth/passport')
const queries = require('../database/queries')

router.get('/user/:username', (req, res) => {
  const { username } = req.params
  queries.findUserWithPostsByUsername(username, (error, data) => {
    res.render('user_profile', {data, session: req.session})
  })
})

router.get('/post/:postId', (req, res, next) => {
  const { postId } = req.params
  queries.getPostWithUserByPostId(postId, (error, data) => {
    res.render('post', {data , session: req.session})
  })
})

router.get('/post/:postId/delete/:username', (req, res, next) => {
  const { postId, username } = req.params
  queries.deletePostById(postId, (error, data) => {
    res.redirect(`/user/${username}`)
  })
})

router.get('/cities/:cityName', (req, res, next) => {
  const { cityName } = req.params
  queries.getCityWithPostsByName(cityName, (error, data) => {
    console.log( "=-=-=-> data", data )
    res.render('city', {data, session: req.session})
  })
})

router.get('/cities/:cityName/:cityId/new_post', (req, res, next) => {
  const { cityName } = req.params
  res.render('new_post', {data: cityName, session: req.session})
})

router.post('/cities/:cityName/:cityId/new_post', (req, res, next) => {
  const { cityName, cityId } = req.params
  const { title, content } = req.body
  const { user } =  req.session.passport
  queries.createPost( user, cityId, title, content, (error, data) => {
    res.redirect(`/cities/${cityName}`)
  })
})

router.get('/log_out', (req, res) => {
  if(req.session.passport) {
    req.session.destroy(() => res.redirect('/sign_in') )
  }
})

module.exports = router
