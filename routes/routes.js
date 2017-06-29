const express = require('express')
const router = express.Router()
const passport = require('../auth/passport')
const queries = require('../database/queries')

router.get('/user/:username', (req, res) => {
  const {username} = req.params
  console.log( "(>'')>  ", username )
  queries.findUserWithPostsByUsername(username, (error, data) => {
    console.log( "=-=-=-> data", data )
    res.render('user_profile', {data})
  })
})

router.get('/post/:postId', (req, res, next) => {
  const postId = req.params.postId
  queries.getPostWithUserByPostId(postId, (error, data) => {
    res.render('post', {data})
  })
})

router.get('/post/:postId/delete/:username', (req, res, next) => {
  const {postId, username} = req.params
  queries.deletePostById(postId, (error, data) => {
    res.redirect(`/user/${username}`)
  })
})

router.get('/cities/:cityName', (req, res, next) => {
  const { cityName } = req.params
  queries.getCityWithPostsByName(cityName, (error, data) => {
    res.render('city', {data})
  })
})

router.get('/cities/:cityName/new_post', (req, res, next) => {
  const {cityName} = req.params
  res.render('new_post', {data: cityName})
})

router.post('/cities/:cityName/new_post', (req, res, next) => {
  const { cityName } = req.params
  const { title, userPost } = req.body

})

router.get('/log_out', (req, res) => {
  if(req.session.passport) {
    req.session.destroy(() => res.redirect('/sign_in') )
  }
})

module.exports = router
