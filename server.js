const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const preAuthRouter = require('./routes/pre_auth_routes')
const router = require('./routes/routes')
const session = require('express-session')
const passport = require('./auth/passport')
const queries = require('./database/queries')

const server = express()
const PORT = process.env.PORT || 3000

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(session({
  secret: 'Dark side',
  resave: true,
  saveUninitialized: false
}))

server.use(express.static(path.join(__dirname, 'public')))

server.use(passport.initialize())
server.use(passport.session())

const sessionChecker = (req, res, next) => {
  if(req.session.passport) {
    next()
  } else{
    res.redirect('/sign_in')
  }
}

server.use(preAuthRouter)
server.use(sessionChecker)
server.use(router)

server.listen(PORT,() => {
  console.log('The Server is running on port', PORT)
})
