const express = require('express')
const bodyParser = require('body-parser')
const cors =  require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Pass our app and attach all endpoints
require('./routes')(app)

// Pass {force: true} into sync method to clear database
sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log('Server started on port ' + config.PORT)
  })