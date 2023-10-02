import Papa from 'papaparse'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

const csvFile = require('../../assets/worldcities.csv')

export type City = {
  admin_name: string
  capital: string
  city: string
  city_ascii: string
  country: string
  id: number
  iso2: string
  iso3: string
  lat: number
  lng: number
  population: number
}

async function createCityPickerItems() {
  try {
    const { localUri } = await Asset.fromModule(csvFile).downloadAsync()
    if (localUri == null) return
    const fileContent = await FileSystem.readAsStringAsync(localUri)

    const parsedData = Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true
    }).data as City[]

    parsedData.sort((a, b) => (a.city < b.city ? -1 : 1))

    return parsedData.map((city: City) => ({
      label: `${city.city}, ${city.country}`,
      value: city.city
    }))
  } catch (error) {
    console.error(error)
  }
}

export { createCityPickerItems }
