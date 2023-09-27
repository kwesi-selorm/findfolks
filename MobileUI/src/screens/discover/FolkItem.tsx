import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export type FolkType = {
  id: number
  name: string
  homeCountry: string
  homeCityOrTown?: string
  countryOfResidence: string
  cityOrTownOfResidence: string
  profilePhoto: string
  bio: string
}
type FolkItemProps = {
  item: FolkType
}

const LocationInfo = ({ item }: FolkItemProps) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <View style={styles.iconTextContainer}>
        <Ionicons name="home-outline" size={10} />
        <Text style={styles.detailsText}>
          {item.homeCityOrTown ? `${item.homeCityOrTown}, ${item.homeCountry}` : item.homeCountry}
        </Text>
      </View>
      <View style={styles.iconTextContainer}>
        <Ionicons name="location-outline" size={10} />
        <Text style={styles.detailsText}>
          {item.cityOrTownOfResidence}, {item.countryOfResidence}
        </Text>
      </View>
    </View>
  )
}

const FolkItem = ({ item }: FolkItemProps) => {
  return (
    <Pressable
      onPress={() => {
        // Open a modal screen showing the folk's details, with the option to connect with them
        console.log({ folk: item.id })
      }}
    >
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {item.profilePhoto !== null && item.profilePhoto != '' ? (
            <Image
              style={styles.photo}
              source={{ uri: `data:image/png;base64,${item.profilePhoto}` }}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={35} color="black" />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.nameText]}>{item.name}</Text>
          <View>
            <LocationInfo item={item} />
          </View>
          <Text style={styles.bioText}>{item.bio}</Text>
        </View>

        <View style={styles.actions}>
          <Ionicons
            name="person-add"
            onPress={() => {
              console.log('Add friend')
            }}
            size={15}
          />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10
  },
  photoContainer: {
    width: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  photo: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '60%'
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Bricolage Grotesque Bold'
  },
  iconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  detailsText: {
    fontSize: 11,
    fontFamily: 'Bricolage Grotesque'
  },
  bioText: {
    fontSize: 10,
    fontFamily: 'Bricolage Grotesque'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FolkItem
