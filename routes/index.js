const router = require('express').Router()
const AuthRouter = require('./auth')
const routerUser = require('./user')
const routerPost = require('./post')
const routerCity = require('./city')

const sessionChecker = (req, res, next) => {
  if(req.session.passport) {
    next()
  } else{
    res.redirect('/sign_in')
  }
}

router.use(AuthRouter)
router.use(sessionChecker)
router.use('/user', routerUser)
router.use('/post', routerPost)
router.use('/city', routerCity)


module.exports = router
