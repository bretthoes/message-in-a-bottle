/**
 * Define api for app using axios.
 */
import axios from 'axios'

export default () => {
  console.log('url: ' + process.env.BASE_URL)
  return axios.create({
    baseURL: process.env.BASE_URL
  })
}
