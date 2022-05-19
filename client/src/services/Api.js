/**
 * Define api for app using axios.
 * Local baseURL:              http://localhost:8081/
 * Current Production baseURL: https://capstone-000794169.herokuapp.com
 */
import axios from 'axios'

export default () => {
  console.log('url: ' + process.env.BASE_URL)
  return axios.create({
    baseURL: process.env.BASE_URL
  })
}
