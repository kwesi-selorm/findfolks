import React from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import AppButton from '../../components/AppButton'
import profile from '../../mock-data/profile'
import { appColors, appFont } from '../../styles'

import { City } from '../../@types'
import cities from '../../mock-data/cities'
import CityItem from './CityItem'

const ProfileScreen = () => {
  const [cityItems, setCityItems] = React.useState<City[]>([])
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null)

  function filterCities(searchText: string) {
    const matches = cities.filter((item) =>
      item.value.toLowerCase().includes(searchText.toLowerCase())
    )
    setCityItems(matches)
  }

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
        size="medium"
        color={appColors.black}
        style={styles.editButton}
      />
      <Text>{profile.name}</Text>
      <Text>{profile.bio}</Text>
      <Text>
        {profile.cityOrTownOfResidence}, {profile.countryOfResidence}
      </Text>

      {/*Maybe a list of number of sent requests, received requests (Under requests),
      connected with 'n' folks, and with buttons to navigate to those screens
      Clicking on edit profile will either open a modal or a new edit screen*/}

      <View style={styles.cityInput}>
        <TextInput
          placeholder="Which city do you live in?"
          value={selectedCity?.value}
          onChangeText={(text) => {
            text === '' ? setCityItems([]) : filterCities(text)
          }}
        />
      </View>
      <FlatList
        data={cityItems}
        renderItem={({ item }) => (
          <CityItem item={item} key={item.id} setSelectedCity={setSelectedCity} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  editButton: {
    alignSelf: 'flex-end'
  },
  name: {
    fontFamily: appFont.extraBold
  },
  cityInput: {
    // width: 'auto',
    // marginRight: 'auto',
    // marginLeft: 'auto'
  }
})

export default ProfileScreen
