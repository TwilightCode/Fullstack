import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ person }) => {
  const request = await axios.post(baseUrl, person)
  return request.data
}

export default { login }