/**
 * Services for users.
 */
import Api from '@/services/Api'

export default {
  post (user) {
    return Api().post('users', user)
  },
  index (matchIds) {
    return Api().get('users', {
      params: {
        matchIds: matchIds
      }
    })
  },
  show (userId) {
    return Api().get(`users/${userId}`)
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  },
  // specific update for sending formData, used
  // for updating blob url to store user image
  update (user) {
    return Api().post('update', user)
  },
  delete (userId) {
    return Api().delete(`users/${userId}`)
  }
}
