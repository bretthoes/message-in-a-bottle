import Api from '@/services/Api'

export default {
  show (quizId) {
    return Api().get(`quizzes/${quizId}`)
  },
  index () {
    return Api().get('quizzes')
  },
  post (quiz) {
    return Api().post('quizzes', quiz)
  }
}
