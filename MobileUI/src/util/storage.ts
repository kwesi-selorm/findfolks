import AsyncStorage from '@react-native-async-storage/async-storage'

async function saveDataToStorage(key: string, data: any) {
  await AsyncStorage.setItem(key, JSON.stringify(data), (err) => {
    if (err) {
      throw new Error(err.message)
    }
  })
}

async function getDataFromStorage(key: string) {
  const jsonValue = await AsyncStorage.getItem(key, (err, result) => {
    if (err) {
      throw new Error(err.message)
    }
    return result
  })
  return jsonValue != null ? JSON.parse(jsonValue) : null
}

export { saveDataToStorage, getDataFromStorage }
