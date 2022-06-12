/**
 * Services for messages.
 */
import Api from '@/services/Api'

export default {
  index (userId) {
    return Api().get(`messages/${userId}`)
  },
  post (message) {
    return Api().post('messages', message)
  },
  delete (messageId) {
    return Api().delete(`messages/${messageId}`)
  }
}
