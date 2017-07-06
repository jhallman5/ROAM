const router = require('express').Router()
const passport = require('../auth/passport')
const queries = require('../database/queries')

router.get('/:cityName', (req, res, next) => {
  const { cityName } = req.params
  queries.getCityWithPostsByName(cityName, (error, data) => {
    res.render('city', {data, session: req.session})
  })
})

router.get('/:cityName/:cityId/new_post', (req, res, next) => {
  const { cityName } = req.params
  res.render('new_post', {data: cityName, session: req.session})
})

router.post('/:cityName/:cityId/new_post', (req, res, next) => {
  const { cityName, cityId } = req.params
  const { title, content } = req.body
  const { user } =  req.session.passport
  queries.createPost( user, cityId, title, content, (error, data) => {
    res.redirect(`/city/${cityName}`)
  })
})

module.exports = router
