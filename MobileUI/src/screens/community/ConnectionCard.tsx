import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Connection, ContactMethod } from '../../@types'
import { appFont, colors } from '../../styles'
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
  { icon: <Icon name="facebook-square" size={20} color="#4267B2" />, mode: ContactMethod.Facebook },
  { icon: <Icon name="snapchat" size={20} color="#FFFC00" />, mode: ContactMethod.Snapchat },
  { icon: <Icon name="twitter" size={20} color="#26a7de" />, mode: ContactMethod.Twitter },
  { icon: <Icon name="mobile" size={20} color="black" />, mode: ContactMethod.Mobile }
]

function getIcon(contactMethod: ContactMethod) {
  return contactMethods.find((cm) => cm.mode === contactMethod)?.icon
}

const ConnectionCard = ({ connection }: ConnectionCardProps) => {
  return (
    <Pressable key={connection.id} style={styles.card}>
      {/*Name*/}
      <Text style={[styles.text, styles.name]}>{connection.name}</Text>

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
          color={colors.grey}
          style={styles.photo}
        />
      )}

      {/*Contact Info*/}
      <View style={styles.contact}>
        {getIcon(connection.preferredContactMethod)}
        <Text style={[styles.text, styles.contactInfo]}>{connection.contactInfo}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    width: 180,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkBlue,
    borderRadius: 15
  },
  name: {
    fontFamily: appFont.extraBold,
    marginBottom: 5,
    fontSize: 18
  },
  text: {
    fontFamily: appFont.regular,
    alignSelf: 'center'
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
  },
  contact: {
    fontFamily: appFont.regular,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 5,
    marginTop: 10,
    color: colors.darkBlue,
    backgroundColor: colors.darkBlue,
    width: '100%',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: colors.darkBlue,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  },
  contactInfo: {
    fontSize: 12,
    color: 'white'
  }
})

export default ConnectionCard
