import { FolkType } from './FolkItem'
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { appFont, appColors } from '../styles'

type FolkProfileProps = {
  folk: FolkType | null
}

const FolkProfile = ({ folk }: FolkProfileProps) => {
  return folk == null ? null : (
    <View style={styles.container}>
      {/*Name*/}
      <Text style={styles.name}>{folk.name}</Text>

      {/*Profile photo*/}
      {folk.profilePhoto !== null && folk.profilePhoto != '' ? (
        <Image
          style={styles.photo}
          source={{ uri: `data:image/png;base64,${folk.profilePhoto}` }}
        />
      ) : (
        <Ionicons name="person-circle-outline" size={150} color={appColors.grey} />
      )}

      {/*Info*/}
      <View style={styles.info}>
        {/*Home country and city*/}
        <View style={styles.iconAndText}>
          <Ionicons name="home" size={10} color={appColors.darkBlue} />
          <Text style={styles.text}>
            <Text style={{ fontFamily: appFont.bold, color: appColors.darkBlue }}>From</Text>{' '}
            {folk.homeCityOrTown ? `${folk.homeCityOrTown}, ` : ''}
            {folk.homeCountry}
          </Text>
        </View>

        {/*Residence country and city*/}
        <View style={styles.iconAndText}>
          <Ionicons name="location" size={10} color={appColors.darkBlue} />
          <Text style={styles.text}>
            <Text style={{ fontFamily: appFont.bold, color: appColors.darkBlue }}>Living in</Text>{' '}
            {folk.cityOrTownOfResidence ? `${folk.cityOrTownOfResidence}, ` : ''}
            {folk.countryOfResidence}
          </Text>
        </View>

        {/*Bio*/}
        <View style={styles.bio}>
          <Text style={[styles.text, styles.bioText]}>{folk.bio}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    width: '80%'
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  name: {
    fontSize: 40,
    fontFamily: appFont.extraBold
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20
  },
  iconAndText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
    justifyContent: 'center'
  },
  text: { fontFamily: appFont.regular },
  bio: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    marginTop: 30,
    justifyContent: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  bioText: {
    textAlign: 'center'
  },
  connectButton: {
    marginTop: 50
  }
})

export default FolkProfile
