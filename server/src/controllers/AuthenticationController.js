/**
 * Controller for authentication requests.
 */
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

/**
 * Sign user with json web token
 * @param {User} user 
 * @param {int} expirationTime 
 * @returns json web token
 */
function jwtSignUser(user) {
  const ONE_WEEK = 604800 // one week in seconds
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
module.exports = {
  /**
   * Register a user.
   * @param {Request} req 
   * @param {Response} res 
   */
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
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
  /**
   * Log a user in.
   * @param {Request} req 
   * @param {Response} res 
   */
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
  },
  /**
   * Send email to reset user password.
   * @param {Request} req 
   * @param {Response} res 
   * @returns 
   */
  async reset (req, res) {
    try {
      // find user with email
      const {email} = req.body
      let user = await User.findOne({
        where: {
          email: email
        }
      })
      // If email nor username found, send error message for display
      if (!user) {
        return res.status(403).send({
          error: 'Email not found.'
        })
      }
      // get JSON data for token
      const userJson = user.toJSON()
      // sign token and set expiration for 20 mins
      // (time allotment to reset password)
      const token = jwt.sign(userJson, config.authentication.resetKey, {expiresIn: 1200})
      // define url
      const data = {
        from: 'noreply@reset.com',
        to: email,
        subject: 'Reset Password',
        html: `<h1>Please click link to reset password.</h1><p>${token}</p>`
      }
      res.sendStatus(200)
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: 'An error has occurred.'
      })
    }
  }
}