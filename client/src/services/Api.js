import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'httpL//localhost:8081/'
  })
}
