import { City } from '../@types'
import API from './config'

async function getCities() {
  const response = await API.get<City[] | null>('/data/cities')
  return response.data
}

export { getCities }
