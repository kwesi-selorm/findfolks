import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createCityPickerItems } from '../../util/csv-reader'
import { Picker } from '@react-native-picker/picker'
import AppButton from '../../components/AppButton'
import { appColors } from '../../styles'
import profile from '../../mock-data/profile'

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
      <AppButton
        text="Edit profile"
        backgroundColor={appColors.darkBlue}
        accessibilityLabel="Edit profile"
        onPress={() => {
          Alert.alert('Edit profile')
        }}
        outline
        size="small"
      />
      <Text>{profile.name}</Text>
      <Text>{profile.bio}</Text>
      <Text>
        {profile.cityOrTownOfResidence}, {profile.countryOfResidence}
      </Text>

      {/*Maybe a list of number of sent requests, received requests (Under requests),
      connected with 'n' folks, and with buttons to navigate to those screens
      Clicking on edit profile will either open a modal or a new edit screen*/}

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
    // width: 'auto',
    // marginRight: 'auto',
    // marginLeft: 'auto'
  }
})

export default ProfileScreen
