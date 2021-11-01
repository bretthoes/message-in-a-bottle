import Api from '@/services/Api'

export default {
  show (userId) {
    console.log('hello from UsersService.js show!')
    console.log(userId)
    return Api().get(`users/${userId}`)
  },
  post (user) {
    return Api().post('users', user)
  }
}
