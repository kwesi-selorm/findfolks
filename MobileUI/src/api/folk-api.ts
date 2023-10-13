import { Folk, Profile } from '../@types'
import { CreateFolkRequest, UpdateFolkRequest } from '../@types/requests'
import API from './config'

const URL = API.defaults.baseURL + 'folks/'

async function getFolksToDiscover(id: number) {
  const response = await API.get<Folk[] | null>(URL + 'discover/' + id)
  return response.data
}

async function createFolk(data: CreateFolkRequest) {
  const response = await API.post<Folk | null>(URL + 'create', data)
  return response.data
}

async function getFolkProfile(id: number) {
  const response = await API.get<Profile | null>(URL + `${id}`)
  return response.data
}

async function updateFolk(id: number, data: UpdateFolkRequest) {
  const response = await API.patch(URL + `${id}`, data)
  return response.data
}

async function saveProfilePhoto(id: number, photo: HTMLImageElement) {
  const response = await API.post(URL + `photo/${id}`, { input: photo })
  return response.data
}

async function deleteFolk(id: number) {
  const response = await API.delete(URL + `${id}`)
  return response.data
}

export { createFolk, deleteFolk, getFolkProfile, getFolksToDiscover, saveProfilePhoto, updateFolk }
