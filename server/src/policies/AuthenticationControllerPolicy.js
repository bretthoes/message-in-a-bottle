/**
 * Policy for authentication.
 */
const Joi = require('joi')

module.exports = {
  /**
   * Policy for validating user info on account creation.
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next move to register endpoint
   */
  register(req, res, next) {
    // define username, email, and password in schema
    const schema = Joi.object({
      username: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{4,16}$')
      ),
      email: Joi.string().min(6).email(),
      //TODO: Beef up this regex for password, kept simple for quick account creation
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{4,16}$')
      )
    })

    // attempt to validate info
    const {error, value} = schema.validate(req.body)

    // handle various errors in creation
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'You must provide a valid username (4-16 characters).'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Password must be 8-32 characters, contain 1 number and 1 letter.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid credentials.'
          })
          break

      }
    } else {
      // move on if no errors
      next()
    }
  }
}