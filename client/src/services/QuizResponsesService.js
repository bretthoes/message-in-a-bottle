import Api from '@/services/Api'

export default {
  index (userId) {
    return Api().get(`quiz-responses/${userId}`)
  },
  // returns count of quiz-responses
  count () {
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
