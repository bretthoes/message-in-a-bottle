const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),

            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        })

        const {
            error,
            value
        } = schema.validate(req.body)


        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Must provide a valid email address.'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'Password must be at least 8 characters.'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid information provded.'
                    })
                    break;

            }
        } else {
            next()
        }
    }
}