/**
 * Controller for quiz response requests.
 */
const { sequelize, QuizResponse } = require('../models')

// CRUD for QuizResponse model
module.exports = {
  /**
   * Create or update quiz response.
   * @param {Request} req 
   * @param {Response} res 
   * @returns quizResponse
   */
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
  /**
   * Retrieve quiz responses.
   * @param {Request} req 
   * @param {Response} res 
   * @returns quizResponses
   */
  async index (req, res) {
    try {
      // return all quiz responses if no user id
      // defined, else return matched quiz responses
      if (req.params.userId === 'undefined') {
        const quizResponses = await QuizResponse.findAll()
        return res.send(quizResponses)
      } else { // user id specified, return matched quiz responses
        // raw custom query to get all matches for a given user
        // TODO replace with sequelize self join statement
        const matches = await sequelize.query(
          'SELECT A.:UserId AS UserId, A.:QuizId ' +
          'FROM QuizResponses A, QuizResponses B ' +
          'WHERE A.:answerKey = B.:answerKey ' +
          'AND A.:QuizId = B.:QuizId ' +
          'AND A.:UserId != B.:UserId ' +
          'AND A.:UserId != :currentUserId ' +
          'AND B.:UserId = :currentUserId',
          {
            model: QuizResponse,
            replacements: {
              answerKey: 'answerKey',
              QuizId: 'QuizId',
              UserId: 'UserId',
              currentUserId: req.params.userId,
            }
          }
        )
        return res.send(matches)
      }
    } catch (err) {
      console.log('err', err)
      return res.status(400).send(err)
    }
  },
  /**
   * Will return a count of both all total responses and total matches.
   * @param {Request} req 
   * @param {Response} res 
   * @returns count of quiz responses
   */
  async count (req, res) {
    try {
      // get all quiz responses
      const quizResponsesCount = await QuizResponse.count()
      // use raw query for self join
      // to get total match count
      // TODO replace with sequelize self join statement
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
      return res.send({responses: (quizResponsesCount).toString(), matches: (matches.length).toString()})
    } catch (err) {
      console.log(err)
      return res.status(400).send(err)
    }
  },
  /**
   * Return single quiz response.
   * @param {Request} req 
   * @param {Response} res 
   * @returns single quizResponse
   */
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
  },
  /**
   * Destroys a quiz response when user resets quiz.
   * @param {Request} req 
   * @param {Response} res 
   * @returns status of destroy
   */
  async destroy (req, res) {
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