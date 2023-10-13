import { City } from '../@types'
import API from './config'

const URL = API.defaults.baseURL + 'data/'

async function getCities() {
  const response = await API.get<City[] | null>(URL + 'cities')
  return response.data
}

export { getCities }
