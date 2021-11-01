const { User } = require('../models')

module.exports = {
    async show (req, res) {
      try {
        console.log('hello from UserController.js show!')
        const user = await User.findByPk(req.params.userId)
        console.log('hello from UserController.js show!')
        console.log(user)
        res.send(user)
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'an error has occurred trying to fetch the user'
        })
      }
    }
}