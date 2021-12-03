/**
 * Define api for app using axios.
 * Local baseURL:              http://localhost:8081/
 * Current Production baseURL: https://capstone-000794169.herokuapp.com
 */
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://capstone-000794169.herokuapp.com/'
  })
}
