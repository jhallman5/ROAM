const express = require('express')
const router = express.Router()
const passport = require('../auth/passport')
const queries = require('../database/queries')

// router.get('/', (req, res) => {
//   console.log( "=-=-=-> req.session", req.cookies)
//   res.render('index')
// })

router.get('/user/:username', (req, res) => {
  console.log( "=-=-=-> req workinggngngg", req.session.passport )
  const username = req.params.username
  queries.findUserWithPostsByUsername(username, (error, data) => {
    res.render('user_profile', {data})
  })
})

// router.post('/sign_in', (req, res, next)  => {
//   passport.authenticate('local', { successRedirect: `/user/${req.body.username}`,
//                                    failureRedirect: '/sign_up'
//   })(req, res, next)
// })
//
// router.post('/sign_up' , (req, res, next)  => {
//   const {username, email, password} = req.body
//   queries.addUser(username, email, password, () => {
//     res.redirect(`/user/${username}`)
//   })
// })

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


module.exports = router
