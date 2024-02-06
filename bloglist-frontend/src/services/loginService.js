import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = async (username, password) => {
  const res = await axios.post(baseUrl, {username, password})
  return res.data
}

export default { login }