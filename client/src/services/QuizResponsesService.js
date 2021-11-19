import Api from '@/services/Api'

export default {
  index () {
    return Api().get('quiz-responses')
  },
  show (compositeKeys) {
    return Api().get(`quiz-responses/${compositeKeys.quizId}/${compositeKeys.userId}`, compositeKeys)
  },
  put (quizResponse) {
    return Api().put('quiz-responses', quizResponse)
  },
  delete (compositeKeys) {
    return Api().delete(`quiz-responses/${compositeKeys.quizId}/${compositeKeys.userId}`, compositeKeys)
  }
}
