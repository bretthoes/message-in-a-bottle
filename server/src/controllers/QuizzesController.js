const { Quiz } = require('../models')
const { Question } = require('../models')
const {QuestionOption } = require('../models')
const {sequelize} = require('../models')

module.exports = {
  async index (req, res) {
    try {
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
      console.log(req.body)
      // create a transaction to handle bulk insert of
      // quiz, quiz questions, and question responses
      const result = await sequelize.transaction(async (t) => {
        const insertedQuiz = await Quiz.create({
          title: req.body.title,
          questionCount: req.body.questions.length
        }, { transaction: t });
        for (const q of req.body.questions) {
          const insertedQuestion = await Question.create({
            text: q.text,
            quizId: insertedQuiz.dataValues.id
          },{ transaction: t })
          for (const r of q.questionOptions) {
            await QuestionOption.create({
              text: r.text,
              questionId: insertedQuestion.dataValues.id
            }, { transaction: t })
          }
        }
        res.sendStatus(200)
      })
    } catch (err) {
      // rollback will occur automatically if exception is
      // thrown in managed transaction
      switch (err.errors[0].type) {
        case 'unique violation':
          error = 'Quiz already exists! Please enter a new title.'
          break
        default:
          error = err.errors[0].message
          break
      }
      res.status(400).send({error})
    }
  }
}