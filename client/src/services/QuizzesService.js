import Api from '@/services/Api'

export default {
  index () {
    return Api().get('quizzes')
  },
  post (quiz) {
    return Api().post('quizzes', quiz)
  }
}
