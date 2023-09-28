import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Connection, ContactMethod } from '../../@types'
import { appFont } from '../../styles'
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
        <Ionicons name="person-circle-outline" size={100} color="black" style={styles.photo} />
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
    backgroundColor: 'lightblue',
    paddingTop: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    width: 180,
    textAlign: 'center',
    borderRadius: 15
  },
  name: {
    fontFamily: appFont.extraBold,
    marginBottom: 5,
    fontSize: 18
  },
  text: {
    color: 'black',
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
    backgroundColor: 'white',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightblue'
  },
  contactInfo: {
    fontSize: 12
  }
})

export default ConnectionCard
