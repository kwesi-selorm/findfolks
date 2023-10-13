import React, { useContext } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import AppButton from '../../components/AppButton'
import AppModal from '../../components/AppModal'

import { connections } from '../../mock-data/connections'
import { appColors, appFont } from '../../styles'
import EditProfileForm from './EditProfileForm'
import AuthContext from '../../contexts/auth-context/AuthContext'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import AppToast from '../../components/AppToast'
import FolkContext from '../../contexts/folk-context/FolkContext'

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { setIsAuthenticated } = React.useContext(AuthContext)
  const { folkProfile } = useContext(FolkContext)

  function handleModalDismiss() {
    setModalVisible(false)
  }
  function handleSignOut() {
    setIsAuthenticated(false)
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppToast />

      {/*Edit folkProfile? modal and form*/}
      <AppModal modalVisible={modalVisible} onDismiss={handleModalDismiss}>
        <EditProfileForm setModalVisible={setModalVisible} />
      </AppModal>

      {/*Edit profile button*/}
      <AppButton
        text="Edit profile"
        backgroundColor={appColors.darkBlue}
        accessibilityLabel="Edit profile button"
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
          {folkProfile?.profilePhoto ? (
            <Image
              source={{ uri: `data:image/png;base64,${folkProfile?.profilePhoto}` }}
              style={styles.profilePhoto}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color={appColors.darkGrey} />
          )}
          <Text style={styles.name}>{folkProfile?.name}</Text>
        </View>

        {/* BIO */}
        <View style={styles.iconAndName}>
          <Ionicons name="chatbubble" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>{folkProfile?.bio ? folkProfile?.bio : '...'}</Text>
        </View>

        {/*HOME COUNTRY*/}
        <View style={styles.iconAndName}>
          <Ionicons name="home" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>
            {folkProfile?.homeCityOrTown
              ? `${folkProfile?.homeCityOrTown}, ${folkProfile?.homeCountry}`
              : `${folkProfile?.homeCountry}`}
          </Text>
        </View>

        {/* LOCATION */}
        <View style={styles.iconAndName}>
          <Ionicons name="location" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>
            {folkProfile?.cityOrTownOfResidence}, {folkProfile?.countryOfResidence}
          </Text>
        </View>

        {/*CONNECTIONS*/}
        <View style={styles.iconAndName}>
          <Ionicons name="people" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>{connections.length}</Text>
        </View>

        {/*SIGN OUT BUTTON*/}
        <AppButton
          text="Sign out"
          onPress={handleSignOut}
          style={styles.signOutButton}
          backgroundColor={appColors.red}
          accessibilityLabel="Sign out button"
          size="small"
          icon={<AntDesignIcon name="logout" size={20} color={appColors.red} />}
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
  texts: {
    fontFamily: appFont.regular
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
    alignItems: 'center',
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
    fontSize: 40
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
  cityInput: {},
  signOutButton: {
    alignSelf: 'center',
    marginTop: '40%'
  }
})

export default ProfileScreen
