const { QuizResponse } = require('../models')

module.exports = {
  async put (req, res) {
    try {
      // check if user has response to given quiz already
      const foundQuizResponse = await QuizResponse.findOne({
        where: {
          UserId: req.body.userId,
          QuizId: req.body.quizId
        }
      })
      if (!foundQuizResponse) {
        // item not found, create
        const quizResponse = await QuizResponse.create({
          UserId: req.body.userId,
          QuizId: req.body.quizId,
          answerKey: req.body.answerKey
        })
        res.send(quizResponse)
      }
      // item found, update
      const quizResponse = await QuizResponse.update({
        answerKey: req.body.answerKey
      }, {
        where: {
          UserId: req.body.userId,
          QuizId: req.body.quizId
        }
      })
      res.send(quizResponse)
    } catch (err) {
      console.log('err', err)
      res.status(400).send(err)
    }
  }
}