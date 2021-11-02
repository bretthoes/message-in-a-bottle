const { User } = require('../models')

module.exports = {
    async show (req, res) {
      try {
        const user = await User.findByPk(req.params.userId)
        res.send(user)
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'an error has occurred trying to fetch the user'
        })
      }
    }
}