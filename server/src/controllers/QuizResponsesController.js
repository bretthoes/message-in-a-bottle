const { QuizResponse } = require('../models')

// CRUD for QuizResponse model
module.exports = {
  // Create or update
  async put (req, res) {
    try {
      // check if user has response to given quiz already
      const foundQuizResponse = await QuizResponse.findOne({
        where: {
          UserId: req.body.userId,
          QuizId: req.body.quizId
        }
      })
      let quizResponse = null
      if (!foundQuizResponse) {
        // item not found, create
        quizResponse = await QuizResponse.create({
          UserId: req.body.userId,
          QuizId: req.body.quizId,
          answerKey: req.body.answerKey
        })
        return res.send(quizResponse)
      } else {
        // item found, update
        quizResponse = await QuizResponse.update({
          answerKey: req.body.answerKey
        }, {
          where: {
            UserId: req.body.userId,
            QuizId: req.body.quizId
          }
        })
      }
      return res.send(quizResponse)
    } catch (err) {
      console.log('err', err)
      return res.status(400).send(err)
    }
  },
  async index (req, res) {
    try {
      // get all quiz responses
      const quizResponses = await QuizResponse.findAll()
      return res.send(quizResponses)
    } catch (err) {
      return res.status(400).send(err)
    }
  },
  async show (req, res) {
    try {
      // get quiz response by userId and quizId
      const quizResponse = await QuizResponse.findOne({
        where: {
          QuizId: req.params.quizId,
          UserId: req.params.userId
        }
      })
      return res.send(quizResponse)
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'an error has occurred trying to retrieve the quiz response.'
      })
    }
  }, async destroy (req, res) {
    try {
      // delete quizResponse by quizId and userId
      const quizResponse = await QuizResponse.destroy({
        where: {
          QuizId: req.params.quizId,
          UserId: req.params.userId
        }
      })
      return res.sendStatus(200)
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'an error has occurred trying to delete the quiz response.'
      })
    }
  }
}