const { User } = require('../models')

module.exports = {
    async show (req, res) {
      try {
        const user = await User.findByPk(req.params.userId)
        res.send(user)
      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'an error has occurred trying to retrieve the user'
        })
      }
    },
    async put (req, res) {
      try {
        const user = await User.update(req.body, {
          where: {
            id: req.params.userId
          }
        })
        res.send(req.body)
      } catch (err) {
        switch (err.errors[0].type) {
          case 'unique violation':
            error = err.errors[0].path + ' is already taken!'
            break
          default:
            res.status(500).send({
              error: 'an error has occurred trying to update the user'
            })
            break
        }
        res.status(400).send({error})
      }
    }
}