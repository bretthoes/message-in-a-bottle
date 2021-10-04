import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/'/* https://capstone-000794169.herokuapp.com */
  })
}
