/**
 * Controller for messages.
 */
 const { Message } = require('../models')
 const { Op } = require('sequelize')
 
 // CRUD for Message model
 module.exports = {
   /**
    * Create a message that was sent by a user.
    * @param {*} req 
    * @param {*} res 
    * @returns message
    */
   async post (req, res) {
     try {
       console.log('MessageController Post')
       let message = null
       message = await Message.create({
        roomId: req.body.roomId,
        senderId: req.body.senderId,
        recipientId: req.body.recipientId,
        text: req.body.text
       })
       return res.send(message)
     } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'an error has occurred trying to create the message.'
      })
     }
   },
   /**
    * Retrieve all messages for a specified user.
    * @param {*} req 
    * @param {*} res 
    * @returns messages for user
    */
   async index (req, res) {
     try {
      messages = await Message.findAll({
        attributes: {exclude: ['updatedAt']},
        where: {
          [Op.or]: [
            { senderId: req.params.userId  },
            { recipientId: req.params.userId  }
          ]
        }
      })
      return res.send(messages)

     } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'an error has occurred trying to retrieve the messages.'
      })
     }
   },
   /**
    * Destroy a specified message by messageId.
    * @param {*} req 
    * @param {*} res 
    * @returns Status of deleted message
    */
   async destroy (req, res) {
     try {
     } catch (err) {
       console.log(err)
       return res.status(500).send({
        error: 'an error has occurred trying to delete the messages.'
      })
     }
   }
 }