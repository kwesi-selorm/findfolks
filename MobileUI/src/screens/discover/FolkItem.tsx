import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { SetStateAction } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { appFont, appColors } from '../../styles'

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
  modalVisible: boolean
  setModalVisible: React.Dispatch<SetStateAction<boolean>>
  setSelectedFolk: React.Dispatch<SetStateAction<FolkType | null>>
}

const LocationInfo = ({ item }: { item: FolkType }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={styles.iconTextContainer}>
        <Ionicons name="home" size={10} color={appColors.darkBlue} />
        <Text style={styles.detailsText}>{item.homeCountry}</Text>
      </View>
      <Text style={{ color: appColors.grey }}>|</Text>
      <View style={styles.iconTextContainer}>
        <Ionicons name="location" size={10} color={appColors.darkBlue} />
        <Text style={styles.detailsText}>{item.countryOfResidence}</Text>
      </View>
    </View>
  )
}

const FolkItem = ({ item, setModalVisible, setSelectedFolk }: FolkItemProps) => {
  function OnFolkPress() {
    setModalVisible((prevState) => !prevState)
    setSelectedFolk(item)
  }

  return (
    <Pressable onPress={OnFolkPress} style={({ pressed }) => pressed && styles.folkPressed}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {/*Profile Photo*/}
          {item.profilePhoto !== null && item.profilePhoto != '' ? (
            <Image
              style={styles.photo}
              source={{ uri: `data:image/png;base64,${item.profilePhoto}` }}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={35} color="gray" />
          )}
        </View>
        <View style={styles.detailsContainer}>
          {/*Name*/}
          <Text style={[styles.nameText]}>{item.name}</Text>

          {/*Location info*/}
          <View>
            <LocationInfo item={item} />
          </View>
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
    width: 35,
    height: 35,
    borderRadius: 18
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
    fontFamily: appFont.bold,
    marginBottom: 5
  },
  iconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  detailsText: {
    fontSize: 11,
    fontFamily: appFont.regular
  },
  bioText: {
    fontSize: 10,
    fontFamily: appFont.regular
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  folkPressed: {
    backgroundColor: 'lightgray'
  }
})

export default FolkItem
