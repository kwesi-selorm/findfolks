import { LoggedInUser, User } from '../@types'
import API from './config'
import { LogInRequest } from '../@types/request-types'

const URL = API.defaults.baseURL + 'auth/'

async function logIn(credentials: LogInRequest) {
  const response = await API.post<LoggedInUser | null>(URL + 'token', credentials)
  return response.data
}

async function getUser(username: string) {
  const response = await API.get<User | null>(`/${username}`)
  return response.data
}

async function deleteUser(id: number) {
  const response = await API.delete(`/${id}`)
  return response.data
}

export { deleteUser, getUser, logIn }
