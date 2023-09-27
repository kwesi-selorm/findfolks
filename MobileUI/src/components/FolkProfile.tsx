import { FolkType } from '../screens/discover/FolkItem'
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

type FolkProfileProps = {
  folk: FolkType | null
}

const FolkProfile = ({ folk }: FolkProfileProps) => {
  return folk == null ? null : (
    <View style={styles.container}>
      {folk.profilePhoto !== null && folk.profilePhoto != '' ? (
        <Image
          style={styles.photo}
          source={{ uri: `data:image/png;base64,${folk.profilePhoto}` }}
        />
      ) : (
        <Ionicons name="person-circle-outline" size={200} color="black" />
      )}
      <Text style={styles.name}>{folk.name}</Text>
      <View style={styles.info}>
        <View style={styles.iconAndText}>
          <Ionicons name="home-outline" size={10} />
          <Text>
            From {folk.homeCityOrTown ? `${folk.homeCityOrTown}, ` : ''}
            {folk.homeCountry}
          </Text>
        </View>
        <View style={styles.iconAndText}>
          <Ionicons name="location-outline" size={10} />
          <Text>
            Living in {folk.cityOrTownOfResidence ? `${folk.cityOrTownOfResidence}, ` : ''}
            {folk.countryOfResidence}
          </Text>
        </View>
        <View style={styles.bio}>
          <Text>'{folk.bio}'</Text>
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
    marginBottom: 50
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  name: {
    fontSize: 40,
    fontFamily: 'Bricolage Grotesque Bold'
  },
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
  iconAndText: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 },
  bio: {
    maxWidth: 150,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
  }
})

export default FolkProfile
