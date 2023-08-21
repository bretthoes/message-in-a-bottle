/**
 * Define api for app using axios.
 */
import axios from 'axios'

export default () => {
  const url = process.env.NODE_ENV.trim() == 'production' ? 'https://message-in-a-bottle.onrender.com/' : process.env.BASE_URL
  return axios.create({
    baseURL: url
  })
}
