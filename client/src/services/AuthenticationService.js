/**
 * Services for authentication.
 */
import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  reset (info) {
    return Api().post('reset', info)
  }
}
