const express = require('express')
const bodyParser = require('body-parser')
const cors =  require('cors')
const morgan = require('morgan')

const app = express()

// Use Morgan log generator
app.use(morgan('combined'))
// Allow our app to process any json request
app.use(bodyParser.json())
// Allow any client to access
app.use(cors())

app.get('/status', (req, res) => {
    res.send({
        message: 'hello world!'
    })
})

app.listen(process.env.PORT || 8081)