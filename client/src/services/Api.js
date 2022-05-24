/**
 * Define api for app using axios.
 */
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: process.env.BASE_URL
  })
}
