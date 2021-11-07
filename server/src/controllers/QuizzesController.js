const { Quiz } = require('../models')
const { Question } = require('../models')
const {QuestionOption } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      console.log('hello from QuizzesController.js index!')
      const quizzes = await Quiz.findAll({
        limit: 99
      })
      res.send(quizzes)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  async post (req, res) {
    try {
      console.log('Hello from QuizzesController post method!');
      console.log('req.body',req.body)
      console.log('req.body.questions',req.body.questions)
      console.log('req.body.questions.responses',JSON.stringify(req.body.questions[0].responses))
      console.log('req.body.questions.responses',JSON.stringify(req.body.questions[0].responses[0]))
      const quiz = await Quiz.create(req.body)
      for (var question in req.body.questions) {
        console.log('question',question)
      }
      // console.log(quiz)
      res.send(quiz)
    } catch (err) {
      res.status(400).send(err)
    }
  }
}