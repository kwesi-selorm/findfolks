import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Connection, ContactMethod } from '../../@types'
import { appFont, appColors, radius } from '../../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

type ConnectionCardProps = {
  connection: Connection
}

const contactMethods = [
  {
    icon: <MCIcon name="email" size={20} color="#DB4437" />,
    mode: ContactMethod.Email
  },
  {
    icon: <Icon name="facebook-square" size={20} color="#4267B2" />,
    mode: ContactMethod.Facebook
  },
  { icon: <Icon name="snapchat" size={20} color="#FFFC00" />, mode: ContactMethod.Snapchat },
  { icon: <Icon name="twitter" size={20} color="#26a7de" />, mode: ContactMethod.Twitter },
  { icon: <Icon name="mobile" size={20} color={appColors.white} />, mode: ContactMethod.Mobile }
]

function getIcon(contactMethod: ContactMethod) {
  return contactMethods.find((cm) => cm.mode === contactMethod)?.icon
}

const ConnectionCard = ({ connection }: ConnectionCardProps) => {
  return (
    <View style={styles.container}>
      <Pressable key={connection.id} style={styles.card}>
        {/*Name*/}
        <View style={styles.nameContainer}>
          <Text style={[styles.text, styles.name]}>{connection.name}</Text>
        </View>

        {/*Profile photo*/}
        {connection.profilePhoto !== null && connection.profilePhoto != '' ? (
          <Image
            style={styles.photo}
            source={{ uri: `data:image/png;base64,${connection.profilePhoto}` }}
          />
        ) : (
          <Ionicons
            name="person-circle-outline"
            size={100}
            color={appColors.grey}
            style={styles.photo}
          />
        )}
      </Pressable>
      {/*Contact Info*/}
      <View style={styles.contact}>
        {getIcon(connection.preferredContactMethod)}
        <Text style={[styles.text, styles.contactInfo]}>{connection.contactInfo}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    marginBottom: 10,
    marginHorizontal: 5
  },
  card: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: appColors.darkBlue,
    borderTopRightRadius: radius.cardRadius,
    borderTopLeftRadius: radius.cardRadius,
    borderBottomWidth: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  nameContainer: {
    borderTopRightRadius: radius.cardRadius - 2,
    borderTopLeftRadius: radius.cardRadius - 2,
    width: '100%',
    backgroundColor: appColors.darkBlue,
    textAlign: 'center',
    marginBottom: 5
  },
  name: {
    fontFamily: appFont.extraBold,
    fontSize: 18,
    paddingVertical: 5,
    color: appColors.white
  },
  text: {
    fontFamily: appFont.regular,
    alignSelf: 'center'
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10
  },
  contact: {
    fontFamily: appFont.regular,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 5,
    // backgroundColor: appColors.darkBlue,
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: appColors.darkBlue,
    borderBottomEndRadius: radius.cardRadius,
    borderBottomStartRadius: radius.cardRadius
  },
  contactInfo: {
    fontSize: 12
    // color: appColors.white
  }
})

export default ConnectionCard
