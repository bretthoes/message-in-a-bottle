const { Quiz } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const quizzes = await Quiz.findAll({
        limit: 99
      })
      res.send(quizzes)
    } catch (err) {
      res.status(400).send({error})
    }
  },
  async post (req, res) {
    try {
      const quiz = await Quiz.create(req.body)
      res.send(quiz)
    } catch (err) {
      res.status(400).send({error})
    }
  }
}