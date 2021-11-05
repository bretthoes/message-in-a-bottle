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
      console.log('Hello from UserController put!')
      console.log('user',user);
      console.log('req.body',req.body);
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
  },
  async upload (req, res) {
    try {
      // note: console.log req.body in put above to find out 
      // how to update imageUrl with blob specifically
      console.log('Hello from UserController upload!')
      console.log(req.files)
      console.log('userId', req.body.userId)
      console.log('img blob', req.files.file.data)
      const user = await User.update(
        {blobUrl: req.files.file.data },
        { where: { id: req.body.userId } }
      ) 

      res.send({
        test: 'hello! '
      })
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: 'An error has occurred.'
      })
    }
  }
}