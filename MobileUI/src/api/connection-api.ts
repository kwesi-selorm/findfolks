import { AxiosRequestConfig } from 'axios'
import { CreateConnectionRequest, DeleteConnectionRequest } from '../@types/requests'
import API from './config'

API.defaults.baseURL = API.defaults.baseURL + 'connections/'

async function createConnection(data: CreateConnectionRequest) {
  const response = await API.post('', data)
  return response.data
}

async function deleteConnection(data: DeleteConnectionRequest) {
  const config: AxiosRequestConfig<DeleteConnectionRequest> = {
    data
  }
  const response = await API.delete('', config)
  return response.data
}

export { createConnection, deleteConnection }
