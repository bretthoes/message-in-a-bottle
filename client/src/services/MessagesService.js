/**
 * Services for messages.
 */
import Api from '@/services/Api'

export default {
  post (message) {
    return Api().post('messages', message)
  },
  index (roomId) {
    return Api().get(`messages/${roomId}`)
  },
  delete (messageId) {
    return Api().delete(`messages/${messageId}`)
  }
}
