import { Folk, Profile } from '../@types'
import { CreateFolkRequest, UpdateFolkRequest } from '../@types/requests'
import API from './config'

API.defaults.baseURL = API.defaults.baseURL + 'folks/'

async function getFolksToDiscover(id: number) {
  const response = await API.get<Folk[] | null>('discover/' + id)
  return response.data
}

async function createFolk(data: CreateFolkRequest) {
  const response = await API.post<Folk | null>('create', data)
  return response.data
}

async function getFolkProfile(id: number) {
  const response = await API.get<Profile | null>(`${id}`)
  return response.data
}

async function updateFolk(id: number, data: UpdateFolkRequest) {
  const response = await API.patch(`${id}`, data)
  return response.data
}

async function saveProfilePhoto(id: number, photo: HTMLImageElement) {
  const response = await API.post(`photo/${id}`, { input: photo })
  return response.data
}

async function deleteFolk(id: number) {
  const response = await API.delete(`${id}`)
  return response.data
}

export { createFolk, deleteFolk, getFolkProfile, getFolksToDiscover, saveProfilePhoto, updateFolk }
