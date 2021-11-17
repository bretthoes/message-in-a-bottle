const { Quiz } = require('../models')
const { Question } = require('../models')
const { QuestionOption } = require('../models')
const { sequelize } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async show (req, res) {
    try {
      // get quiz and include all belonging questions
      // and each question's belonging QuestionOption 
      const quiz = await Quiz.findOne({
        where: {
          id: req.params.quizId
        },
        include: {
          model: Question,
          include: QuestionOption
        }
      })
      return res.send(quiz)
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        error: 'an error has occurred trying to retrieve the user'
      })
    }
  },
  async index (req, res) {
    try {
      let quizzes = null
      if (req.query.search) {
        const search = req.query.search
        quizzes = await Quiz.findAll({
          where: {
            title: {
              [Op.like]: `%${search}%`
            }
          }
        })
      } else {
        // get all quizzes 
        quizzes = await Quiz.findAll({
          limit: 99
        })
      }
      return res.send(quizzes)
    } catch (err) {
      return res.status(400).send(err)
    }
  },
  async post (req, res) {
    try {
      // create a transaction to handle bulk insert of
      // quiz, quiz questions, and question responses
      const result = await sequelize.transaction(async (t) => {
        // insert quiz
        const insertedQuiz = await Quiz.create({
          title: req.body.title,
          questionCount: req.body.questions.length
        }, { transaction: t })
        // insert each question within quiz
        for (const q of req.body.questions) {
          const insertedQuestion = await Question.create({
            text: q.text,
            QuizId: insertedQuiz.id
          },{ transaction: t })
          // insert each question option within a question
          for (const o of q.questionOptions) {
            await QuestionOption.create({
              text: o.text,
              QuestionId: insertedQuestion.id
            }, { transaction: t })
          }
        }
      })
      return res.sendStatus(200)
    } catch (err) {
      // rollback will occur automatically if exception is
      // thrown in managed transaction
      if (err.errors) {
        switch (err.errors[0].type) {
          case 'unique violation':
            error = 'Quiz already exists! Please enter a new title.'
            break
          default:
            error = err.errors[0].message
            break
        }
      } else {
        error = err;
      }
      return res.status(400).send({error})
    }
  }
}