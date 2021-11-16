const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const QuizzesController = require('./controllers/QuizzesController')
const QuizResponsesController = require('./controllers/QuizResponsesController')
const UsersController = require('./controllers/UsersController')

// define all routes
module.exports = (app) => {

  // Authentication controller routes
  app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  // Quizzes controller routes
  app.get('/quizzes',
    QuizzesController.index)

  app.post('/quizzes',
    QuizzesController.post) // TODO possible policy for cleaner validation?

  app.get('/quizzes/:quizId',
    QuizzesController.show)

  // QuizResponses controller routes
  app.put('/quiz-responses',
    QuizResponsesController.put)

  app.get('/quiz-responses',
  QuizResponsesController.index)

  // Users controller routes
  app.get('/users/:userId',
    UsersController.show)
  
  app.put('/users/:userId',
    UsersController.put)

  app.post('/update',
    UsersController.update)
}