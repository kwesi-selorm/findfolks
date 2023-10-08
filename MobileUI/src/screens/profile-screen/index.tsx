import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import AppButton from '../../components/AppButton'
import AppModal from '../../components/AppModal'

import profile from '../../mock-data/profile'
import { appColors, appFont } from '../../styles'
import EditProfileForm from './EditProfileForm'

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false)

  function handleModalDismiss() {
    setModalVisible(false)
  }

  return (
    <SafeAreaView>
      <AppModal modalVisible={modalVisible} onDismiss={handleModalDismiss}>
        <EditProfileForm setModalVisible={setModalVisible} />
      </AppModal>
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
