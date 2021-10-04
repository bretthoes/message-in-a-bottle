import Api from '@/services/Api'

export default {
  index () {
    return Api().get('quizzes')
  },
  post (credentials) {
    return Api().post('quizzes', credentials)
  }
}
