import Api from '@/services/Api'

export default {
  show (quizId) {
    return Api().get(`quizzes/${quizId}`)
  },
  index (search) {
    return Api().get('quizzes', {
      params: {
        search: search
      }
    })
  },
  post (quiz) {
    return Api().post('quizzes', quiz)
  },
  delete (quizId) {
    return Api().delete(`quizzes/${quizId}`)
  }
}
