import React from 'react'
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { City } from '../../@types'
import AppButton from '../../components/AppButton'
import cities from '../../mock-data/cities'
import profile from '../../mock-data/profile'
import { appColors, appFont } from '../../styles'
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
        size="small"
        color={appColors.black}
        style={styles.editButton}
        icon={<MaterialCommunityIcon name="account-edit" size={20} color={appColors.darkBlue} />}
      />
      <View style={styles.body}>
        <View style={styles.photoAndName}>
          <Image
            source={{ uri: `data:image/png;base64,${profile.profilePhoto}` }}
            style={styles.profilePhoto}
          />
          <Text style={styles.name}>{profile.name}</Text>
        </View>

        {/* BIO */}
        <View style={styles.bio}>
          <Ionicons name="chatbubble-outline" size={15} color={appColors.darkBlue} />
          <Text style={styles.bioText}>{profile.bio}</Text>
        </View>

        {/* LOCATION */}
        <View style={styles.location}>
          <Ionicons name="location-outline" size={15} color={appColors.darkBlue} />
          <Text>
            {profile.cityOrTownOfResidence}, {profile.countryOfResidence}
          </Text>
        </View>

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
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  editButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 10
  },
  body: {
    paddingHorizontal: 20
  },
  photoAndName: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 20
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name: {
    fontFamily: appFont.extraBold,
    fontSize: 30
  },

  bio: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  bioText: { fontFamily: appFont.regular },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  cityInput: {
    // width: 'auto',
    // marginRight: 'auto',
    // marginLeft: 'auto'
  }
})

export default ProfileScreen
