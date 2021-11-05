const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const QuizzesController = require('./controllers/QuizzesController')
const UsersController = require('./controllers/UsersController')

module.exports = (app) => {
  app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/quizzes',
    QuizzesController.index)

  app.post('/quizzes',
    QuizzesController.post)

  app.get('/users/:userId',
    UsersController.show)
  
  app.put('/users/:userId',
    UsersController.put)

  app.post('/upload',
    UsersController.upload)
}