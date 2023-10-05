import React, { Dispatch, SetStateAction } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { City, EditProfileFormValues } from '../../@types'
import { appColors, appFont } from '../../styles'

type CityItemProps = {
  item: City
  setValues: Dispatch<SetStateAction<EditProfileFormValues>>
  setCityItems: Dispatch<SetStateAction<City[]>>
}

const CityItem: React.FC<CityItemProps> = ({ item, setValues, setCityItems }) => {
  const city = item.value
  const country = item.label.split(', ')[1]

  function onSelectCity(cityItem: City) {
    setValues((prev) => ({ ...prev, cityOfResidence: cityItem.value }))
    setCityItems([])
  }

  return (
    <Pressable
      style={styles.container}
      key={item.id}
      onPress={() => {
        onSelectCity(item)
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
