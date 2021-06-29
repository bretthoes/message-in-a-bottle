const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{4,16}$')
      ),
      email: Joi.string().min(6).email(),
      password: Joi.string().regex(
        new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$')
      )
    })

    const {error, value} = schema.validate(req.body)

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
      next()
    }
  }
}