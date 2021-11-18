const { QuizResponse } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      // get all quizzes 
      const quizResponses = await QuizResponse.findAll()
      return res.send(quizResponses)
    } catch (err) {
      return res.status(400).send(err)
    }
  },
  async show (req, res) {
    try {
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
        error: 'an error has occurred trying to retrieve the user'
      })
    }
  },
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
  }
}