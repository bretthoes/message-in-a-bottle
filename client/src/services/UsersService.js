import Api from '@/services/Api'

export default {
  show (userId) {
    return Api().get(`users/${userId}`)
  },
  post (user) {
    return Api().post('users', user)
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  }
}
