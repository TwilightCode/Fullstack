import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
/*
const getAllUsers = async ({id}) => {
  const request = await axios.get(`/api/blogs/${id}`)
  return request.data
}
*/
const create = async ({ newBlog }) => {
  const config = {
    headers: { Authorization: token },

  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, setToken, create/*, getAllUsers*/ }