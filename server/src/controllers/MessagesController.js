/**
 * Controller for messages.
 */
 const { Message } = require('../models')
 
 // CRUD for Message model
 module.exports = {
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
     }
   },
   async index (req, res) {
     try {
     } catch (err) {
      console.log(err)
     }
   },
   async destroy (req, res) {
     try {
     } catch (err) {
       console.log(err)
     }
   }
 }