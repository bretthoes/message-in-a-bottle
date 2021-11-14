import Api from '@/services/Api'

export default {
  show (quizId) {
    console.log('QuizzesService show quizId:', quizId)
    return Api().get(`quizzes/${quizId}`)
  },
  index () {
    return Api().get('quizzes')
  },
  post (quiz) {
    return Api().post('quizzes', quiz)
  },
  getQuestionsByQuizId (quizId) {
    console.log('QuizzesService getqbyid: ', quizId)
    return Api().get('getQuestionsByQuizId', {quizId})
  }
}
