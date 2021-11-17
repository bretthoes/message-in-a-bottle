const { sequelize, User, Quiz, Question, QuestionOption, QuizResponse } = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const quizzes = require('./quizzes.json')
const questions = require('./questions.json')
const questionOptions = require('./questionOptions.json')
const quizResponses = require('./quizResponses.json')

sequelize.sync({
    force: true
  })
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
    await Promise.all(
      quizzes.map(quiz => {
        Quiz.create(quiz)
      })
    )
    await Promise.all(
      questions.map(question => {
        Question.create(question)
      })
    )
    await Promise.all(
      questionOptions.map(questionOption => {
        QuestionOption.create(questionOption)
      })
    )
    await Promise.all(
      quizResponses.map(quizResponse => {
        QuizResponse.create(quizResponse)
      })
    )
  })