import Api from '@/services/Api'

export default {
  show (compositeKeys) {
    return Api().get(`quiz-responses/${compositeKeys.quizId}/${compositeKeys.userId}`, compositeKeys)
  },
  put (quizResponse) {
    return Api().put('quiz-responses', quizResponse)
  },
  index () {
    return Api().get('quiz-responses')
  }
}
