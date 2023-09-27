import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export type FolkType = {
  id: number
  name: string
  homeCountry: string
  homeCityOrTown?: string
  countryOfResidence: string
  cityOrTownOfResidence: string
  profilePhoto: string
}
type FolkItemProps = {
  item: FolkType
}

const FolkItem = ({ item }: FolkItemProps) => {
  return (
    <Pressable
      onPress={() => {
        console.log({ folk: item.id })
      }}
    >
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image style={styles.photo} source={{ uri: item.profilePhoto }} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.residenceText}>
            {item.cityOrTownOfResidence}, {item.countryOfResidence}
          </Text>
        </View>
        <View style={styles.actions}>
          <Icon
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
    width: '10%'
  },
  photo: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '50%'
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12
  },
  residenceText: {
    fontSize: 10
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FolkItem
