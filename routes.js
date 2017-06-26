const express = require('express')
const router = express.Router()

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

router.post('/sign_in', (req, res) =>{
  const body = req.body
  console.log( "=-=-=-> req", req )
  console.log( "=-=-=-> body", body )
})

module.exports = router
