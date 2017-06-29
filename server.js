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

const PORT = 3000

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(session({
  key: 'user_session',
  secret: 'Dark side',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 1000 }
}))

server.use(express.static(path.join(__dirname, 'public')))

server.use(passport.initialize())
server.use(passport.session())

server.use((req, res, next) =>{
  if(!(req.cookies && req.cookies.user_session)){
    res.clearCookie('user_session')
  }
  next()
})

const sessionChecker = (req, res, next) => {
  if(req.cookies.session && req.cookies.user_session) {
    next()
  } else{
    res.redirect('/sign_in')
  }
}

server.use(preAuthRouter)
server.use(sessionChecker)
server.use(router)

server.listen(PORT,() => {
  console.log('The Server is running on port', + PORT)
})
