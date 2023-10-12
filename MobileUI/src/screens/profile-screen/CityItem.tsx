import React, { Dispatch, SetStateAction } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { City, EditProfileFormValues } from '../../@types'
import { appColors, appFont } from '../../styles'

type CityItemProps = {
  item: City
  setValues: Dispatch<SetStateAction<EditProfileFormValues>>
  setCityItems: Dispatch<SetStateAction<City[]>>
  setModalVisible: Dispatch<SetStateAction<boolean>>
}

const CityItem: React.FC<CityItemProps> = ({ item, setValues, setCityItems, setModalVisible }) => {
  const city = item.value
  const country = item.label.split(', ')[1]

  function onSelectCity() {
    setValues((prev) => ({ ...prev, cityOfResidence: city }))
    setValues((prev) => ({ ...prev, countryOfResidence: country }))
    setCityItems([])
    setModalVisible(false)
  }

  return (
    <Pressable
      style={styles.container}
      key={item.id}
      onPress={() => {
        onSelectCity()
      }}
    >
      <Text style={styles.text}>
        {city} ({country})
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: appColors.white,
    color: appColors.white,
    borderWidth: 1,
    backgroundColor: appColors.grey,
    width: '100%',
    padding: 5,
    textAlign: 'center'
  },
  text: {
    fontFamily: appFont.regular
  }
})

export default CityItem
