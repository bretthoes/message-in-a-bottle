const { sequelize, QuizResponse } = require('../models')

// CRUD for QuizResponse model
module.exports = {
  // Create or update
  // TODO can update this to just create since we handle
  // quiz response deletions on resetting of quiz status
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
      if (req.query.count) {
        // use raw query for self join
        // to get total match count
        const matches = await sequelize.query(
          'SELECT A.:id as count ' + 
          'FROM QuizResponses A, QuizResponses B  ' +
          'WHERE A.:answerKey = B.:answerKey ' +
          'AND A.:QuizId = B.:QuizId ' +
          'AND A.:UserId < B.:UserId',
        { 
          model: QuizResponse,
          replacements: {
            answerKey: 'answerKey',
            QuizId: 'QuizId',
            UserId: 'UserId',
            id: 'id',
          }
        });
        return res.send(matches)
      } else {
        // get all quiz responses
        const quizResponses = await QuizResponse.findAll()
        return res.send(quizResponses)
      }
    } catch (err) {
      console.log(err)
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