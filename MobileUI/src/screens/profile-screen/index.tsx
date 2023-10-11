import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import AppButton from '../../components/AppButton'
import AppModal from '../../components/AppModal'

import { connections } from '../../mock-data/connections'
import profile from '../../mock-data/profile'
import { appColors, appFont } from '../../styles'
import EditProfileForm from './EditProfileForm'
import AuthContext from '../../contexts/auth-context/AuthContext'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const { setIsAuthenticated } = React.useContext(AuthContext)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  function handleModalDismiss() {
    setModalVisible(false)
  }
  function handleSignOut() {
    setIsAuthenticated(false)
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*Edit profile modal and form*/}
      <AppModal modalVisible={modalVisible} onDismiss={handleModalDismiss}>
        <EditProfileForm setModalVisible={setModalVisible} />
      </AppModal>

      {/*Edit profile button*/}
      <AppButton
        text="Edit profile"
        backgroundColor={appColors.darkBlue}
        accessibilityLabel="Edit profile"
        onPress={() => {
          setModalVisible(true)
        }}
        outline
        size="small"
        color={appColors.black}
        style={styles.editButton}
        icon={<MaterialCommunityIcon name="account-edit" size={20} color={appColors.darkBlue} />}
      />

      {/*Main body*/}
      <View style={styles.body}>
        <View style={styles.photoAndName}>
          <Image
            source={{ uri: `data:image/png;base64,${profile.profilePhoto}` }}
            style={styles.profilePhoto}
          />
          <Text style={styles.name}>{profile.name}</Text>
        </View>

        {/* BIO */}
        <View style={styles.iconAndName}>
          <Ionicons name="chatbubble" size={20} color={appColors.darkBlue} />
          <Text style={styles.bioText}>{profile.bio}</Text>
        </View>

        {/*HOME COUNTRY*/}
        <View style={styles.iconAndName}>
          <Ionicons name="home" size={20} color={appColors.darkBlue} />
          <Text>
            {profile.homeCityOrTown
              ? `${profile.homeCityOrTown}, ${profile.homeCountry}`
              : `${profile.homeCountry}`}
          </Text>
        </View>

        {/* LOCATION */}
        <View style={styles.iconAndName}>
          <Ionicons name="location" size={20} color={appColors.darkBlue} />
          <Text>
            {profile.cityOrTownOfResidence}, {profile.countryOfResidence}
          </Text>
        </View>

        {/*Maybe a list of number of sent requests, received requests (Under requests),
      connected with 'n' folks, and with buttons to navigate to those screens
      Clicking on edit profile will either open a modal or a new edit screen*/}
        {/*CONNECTIONS*/}
        <View style={styles.iconAndName}>
          <Ionicons name="people" size={20} color={appColors.darkBlue} />
          <Text>Connections: {connections.length}</Text>
        </View>

        {/*SIGN OUT BUTTON*/}
        <AppButton
          text="Sign out"
          onPress={handleSignOut}
          style={styles.signOutButton}
          backgroundColor={appColors.red}
          accessibilityLabel="Sign out button"
          size="small"
          icon={<AntDesignIcon name="logout" size={20} color={appColors.black} />}
          outline
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
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
  iconAndName: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },

  bio: {
    marginBottom: 5
  },
  bioText: { fontFamily: appFont.regular },

  cityInput: {},
  signOutButton: {
    alignSelf: 'center',
    marginTop: '40%'
  }
})

export default ProfileScreen
