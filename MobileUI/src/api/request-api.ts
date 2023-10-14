import { UserRequests } from '../@types'
import { CreateRequestRequest } from '../@types/request-types'
import API from './config'

API.defaults.baseURL = API.defaults.baseURL + 'requests'

async function createRequest(data: CreateRequestRequest) {
  const response = await API.post('', data)
  return response.data
}

async function getRequests(userId: number) {
  const response = await API.get<UserRequests | null>(`/${userId}`)
  return response.data
}

async function deleteRequest(requestdId: number) {
  const response = await API.delete(`/${requestdId}`)
  return response.data
}

export { createRequest, deleteRequest, getRequests }
