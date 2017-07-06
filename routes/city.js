const router = require('express').Router()
const passport = require('../auth/passport')
const { City } = require('../database/queries')

router.get('/:cityName', (req, res, next) => {
  const { cityName } = req.params
  City.getCityWithPostsByName(cityName, (error, data) => {
    res.render('city', {data, session: req.session})
  })
})

module.exports = router
