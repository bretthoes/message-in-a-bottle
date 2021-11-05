const express = require('express')
const bodyParser = require('body-parser')
const cors =  require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const path = require('path')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(fileUpload())
// TODO: Check if still needed for dev and prod
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
    app.listen(config.port)
    console.log('Server started on port ' + config.port)
  })