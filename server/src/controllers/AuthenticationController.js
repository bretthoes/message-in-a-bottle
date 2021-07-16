const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
  const ONE_WEEK = 604800 // seconds
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err.errors[0].type)
      switch (err.errors[0].type) {
        case 'unique violation':
          error = err.errors[0].path + ' is already taken!'
          break
        default:
          error = err.errors[0].message
          break
      }
      res.status(400).send({error})
    }
  },
  async login(req, res) {
    try {
      const {
        username,
        email,
        password
      } = req.body
      // Check for matching email
      let user = await User.findOne({
        where: {
          email: email
        }
      })
      // Check for matching username
      if (!user) {
        user = await User.findOne({
          where: {
            username: username
          }
        })
      }
      // If email nor username found, send error message for display
      if (!user) {
        return res.status(403).send({
          error: 'Email or password was incorrect.'
        })
      }
      // Check password
      const isPasswordValid = await user.comparePassword(password)
      // If password invalid, send error message for display
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Email or password was incorrect.'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: 'An error has occurred.'
      })
    }
  }
}