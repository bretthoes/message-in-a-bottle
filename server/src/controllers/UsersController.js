/**
 * Controller for user requests.
 */
const { User } = require('../models')

// CRUD for User model
module.exports = {
  /**
   * Get users.
   * @param {Request} req 
   * @param {Response} res 
   */
  async index (req, res) {
    try {
      // check for params
      let empty
      for (const q in req.query) empty = false
      empty = true
      let users
      // if no params, return all users
      if (empty) {
        users = await User.findAll()
      } else { // if params, return matched users
        users = await User.findAll({
          where: {
            id: req.query.matchIds
          }
        })
      }      
      res.send(users)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurred fetching the users.'
      })
    }
  },
  /**
   * Get specific user.
   * @param {Request} req 
   * @param {Resonse} res 
   */
  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      res.send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to retrieve the user.'
      })
    }
  },
  /**
   * Update user.
   * @param {Request} req 
   * @param {Response} res 
   */
  async put (req, res) {
    try {
      // ensure a blobUrl is never updated from an endpoint with invalid header/encoder
      delete req.body.blobUrl
      await User.update(req.body, {
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
  },
  /**
   * Update user with attached image.
   * Separated from above update as
   * FormData will not be required to
   * send if image not being updated.
   * @param {Request} req 
   * @param {Response} res 
   */
  async update (req, res) {
    try {
      await User.update(
        {
          username: req.body.username,
          blobUrl: req.files.file.data,
          imageType: req.files.file.mimetype,
          birthdate: req.body.birthdate,
          biography: req.body.biography
        },
        { where: { id: req.body.id } }
      )
      res.send(req.body)
    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: 'An error has occurred.'
      })
    }
  },
  /**
   * Destroys user.
   * @param {Request} req 
   * @param {Response} res 
   * @returns status of destroy
   */
  async destroy (req, res) {
    try {
      const user = await User.destroy({
        where: {
          id: req.params.userId
        }
      })
      return res.sendStatus(200)
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'an error has occurred trying to retrieve the user'
      })
    }
  }
}