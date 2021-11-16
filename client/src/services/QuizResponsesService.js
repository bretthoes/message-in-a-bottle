import Api from '@/services/Api'

export default {
  put (quizResponse) {
    return Api().put('quiz-responses', quizResponse)
  }
}
