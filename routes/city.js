const router = require('express').Router()
const passport = require('../auth/passport')
const { City } = require('../database/queries')

router.get('/:cityName', (req, res, next) => {
  console.log( "=-=-=-> req.id", req.user )
  const { cityName } = req.params
  City.getCityWithPostsByName(cityName)
    .then( data => {
      res.render('city', {data, session: req.session})
    })
})

module.exports = router
