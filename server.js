const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const router = require('./routes')
const session = require('express-session')
const passport = require('./auth/passport')
const { readConfig } = require('./config/config')

const server = express()
const PORT = process.env.PORT || 9001

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(session({
  secret: process.env.SESSION,
  resave: true,
  saveUninitialized: false
}))

server.use(express.static(path.join(__dirname, 'public')))

server.use(passport.initialize())
server.use(passport.session())

server.use(router)

server.listen(PORT,() => {
  console.log('The Server is running on port', PORT)
  console.log('Using a ' + process.env.NODE_ENV + ' enviroment' )
})
