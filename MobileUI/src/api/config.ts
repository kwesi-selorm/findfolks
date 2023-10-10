import axios from 'axios'
import { LoggedInUser } from '../@types'
import { getDataFromStorage } from '../util/storage'

const API = axios.create({
  baseURL: 'http://localhost:5020/api/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

async function setAuthorizationHeader() {
  const user = (await getDataFromStorage('user')) as LoggedInUser | null
  if (user == null) return
  const token = user.token
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
setAuthorizationHeader().catch((err) => {
  throw new Error(err.message)
})

export default API
