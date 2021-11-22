const express = require('express')
const bodyParser = require('body-parser')
const cors =  require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const path = require('path')
const {sequelize} = require('./models')
const config = require('./config/config')
const _ = require("lodash")
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(fileUpload())
const router = express.Router();
router.get('/', function(req, res, next){
 req.url = '/index.html'
 next();
})

app.use(router)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../dist")))
  console.log(process.env.NODE_ENV)
}

app.use(cors())

// Pass our app and attach all endpoints
require('./routes')(app)

// Pass {force: true} into sync method to clear database
sequelize.sync({force: false})
  .then(() => {
    const server = app.listen(config.port)
    console.log('Server started on port ' + config.port)
    const io = require('socket.io')(server, {
      cors: {
        origin: '*'
      }
    })
    // track online users from socket connects/disconnects
    let users = {}
    // handle connection
    io.on('connection', function (socket) {
      // get user id from connection
      const userId = socket.handshake.query.userId

      // check if user exists
      if (!users[userId]) users[userId] = []

      // add socket id from user's connection
      users[userId].push(socket.id)

      // broadcast online status to all users
      io.emit('online', users)

      // handle disconnect
      socket.on('disconnect', () => {
        // remove user from connected users
        _.remove(users[userId], u => u === socket.id)

        // no connections for user, delete and broadcast offline status
        if (users[userId].length === 0) {
          delete users[userId]
          io.emit("offline", users)
        }
        // disconnect socket
        socket.disconnect()
      })
      // handle send message
      socket.on('SEND_MESSAGE', (message) => {
        io.emit('MESSAGE', message)
      })
    })
  })
