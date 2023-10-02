import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createCityPickerItems } from '../../util/csv-reader'
import { Picker } from '@react-native-picker/picker'

type CityItem = {
  label: string
  value: string
}

const ProfileScreen = () => {
  const [cityItems, setCityItems] = React.useState<CityItem[]>([])
  const [selectedCity, setSelectedCity] = React.useState('')

  useEffect(() => {
    async function createCityItems() {
      const items = await createCityPickerItems()
      setCityItems(items ?? [])
    }
    createCityItems().then()
  }, [])

  return (
    <SafeAreaView>
      <Text>City</Text>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => {
          setSelectedCity(itemValue)
        }}
        enabled={true}
        prompt={'Select a city'}
        style={styles.picker}
      >
        {cityItems.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  picker: {
    width: '50%'
  }
})

export default ProfileScreen
