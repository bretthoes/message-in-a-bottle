import Api from '@/services/Api'

export default {
  post (quiz) {
    return Api().post('quizzes', quiz)
  },
  index (search) {
    return Api().get('quizzes', {
      params: {
        search: search
      }
    })
  },
  show (quizId) {
    return Api().get(`quizzes/${quizId}`)
  },
  delete (quizId) {
    return Api().delete(`quizzes/${quizId}`)
  }
}
