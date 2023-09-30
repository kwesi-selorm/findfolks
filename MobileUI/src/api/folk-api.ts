import API from './config'
import { Folk, Profile } from '../@types'
API.defaults.baseURL = API.defaults.baseURL + 'folks/'

async function getFolksToDiscover(id: number) {
  const response = await API.get<Folk[] | null>('discover/' + id)
  return response.data
}

async function getProfile(id: number) {
  const response = await API.get<Profile | null>('' + id)
  return response.data
}
