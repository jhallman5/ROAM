const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const server = express()

const PORT = 3000

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, 'public')))

server.get('/', (req, res) => {
  res.render('index.ejs')
})
server.listen(PORT,() => {
  console.log('The Server is running on port', + PORT)
})
