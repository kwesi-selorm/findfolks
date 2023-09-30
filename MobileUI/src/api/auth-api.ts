import API from './config'
import { LoggedInUser } from '../@types'
API.defaults.baseURL = API.defaults.baseURL + 'auth'

type LogInRequest = {
  username: string
  password: string
}

async function logIn(credentials: LogInRequest) {
  const response = await API.post<LoggedInUser | null>('/token', credentials)
  return response.data
}
