/**
 * Define api for app using axios.
 */
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://message-in-a-bottle.onrender.com/'//process.env.BASE_URL
  })
}
