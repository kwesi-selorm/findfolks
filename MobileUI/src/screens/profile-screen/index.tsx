import React, { useContext, useEffect } from 'react'
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
import { useQuery } from '@tanstack/react-query'
import { getFolkProfile } from '../../api/folk-api'
import { parseAPIError } from '../../util/error-parsers'
import ToastContext from '../../contexts/toast-context/ToastContext'
import { Profile } from '../../@types'
import ListSeparator from '../../components/ListSeparator'
import LoadingIcon from '../../components/LoadingIcon'

const ProfileScreen = () => {
  const [profile, setProfile] = React.useState<Profile | null>(null)
  const [modalVisible, setModalVisible] = React.useState(false)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { toast } = useContext(ToastContext)
  const { setIsAuthenticated, loggedInUser } = React.useContext(AuthContext)
  const { setFolkProfile } = useContext(FolkContext)

  const { data, isLoading, isError, error } = useQuery(
    ['folk-profile', loggedInUser],
    () => {
      if (loggedInUser == null) return
      return getFolkProfile(loggedInUser.id)
    },
    {
      enabled: !!loggedInUser
    }
  )

  useEffect(() => {
    if (data == null) {
      return
    }
    setProfile(data)
    setFolkProfile(data)
  }, [data])

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isError) {
    const errorData = parseAPIError(error)
    toast({
      message: errorData.message,
      type: 'error',
      duration: 10000
    })
  }

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
        size="small"
        style={styles.editButton}
        icon={<MaterialCommunityIcon name="account-edit" size={20} color={appColors.white} />}
      />

      {/*MAIN BODY*/}
      <View style={styles.body}>
        {/*PROFILE PHOTO AND NAME*/}
        <View style={styles.photoAndName}>
          {profile?.profilePhoto ? (
            <Image
              source={{ uri: `data:image/png;base64,${profile?.profilePhoto}` }}
              style={styles.profilePhoto}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color={appColors.darkGrey} />
          )}
          <Text style={styles.name}>{profile?.name}</Text>
        </View>

        {/* BIO */}
        <View style={styles.iconAndName}>
          <Ionicons name="chatbubble-outline" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>
            <Text style={styles.boldText}>Bio</Text>
            {profile?.bio ? `${'\t'}${profile?.bio}` : `${'\t'}...`}
          </Text>
        </View>
        <ListSeparator />

        {/*HOME COUNTRY*/}
        <View style={styles.iconAndName}>
          <Ionicons name="home-outline" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>
            <Text style={styles.boldText}>Home</Text>
            {'\t'}
            {profile?.homeCityOrTown
              ? `${profile?.homeCityOrTown}, ${profile?.homeCountry}`
              : `${profile?.homeCountry}`}
          </Text>
        </View>
        <ListSeparator />

        {/* LOCATION */}
        <View style={styles.iconAndName}>
          <Ionicons name="location-outline" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>
            <Text style={styles.boldText}>Residence</Text>
            {'\t'}
            {profile?.cityOrTownOfResidence}, {profile?.countryOfResidence}
          </Text>
        </View>
        <ListSeparator />

        {/*CONNECTIONS*/}
        <View style={styles.iconAndName}>
          <Ionicons name="people-outline" size={20} color={appColors.darkBlue} />
          <Text style={styles.texts}>
            <Text style={styles.boldText}>Connections</Text>
            {'\t'}
            {connections.length}
          </Text>
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
  boldText: {
    fontFamily: appFont.extraBold
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
