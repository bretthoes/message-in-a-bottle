import Api from '@/services/Api'

export default {
  index (count) {
    return Api().get('quiz-responses', {
      params: {
        count: count
      }
    })
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
