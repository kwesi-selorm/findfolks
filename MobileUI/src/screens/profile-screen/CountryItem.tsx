import React, { Dispatch, SetStateAction } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Country, EditProfileFormValues } from '../../@types'
import { appColors, appFont } from '../../styles'

type CountryItemProps = {
  item: Country
  setValues: Dispatch<SetStateAction<EditProfileFormValues>>
  setCountryItems: Dispatch<SetStateAction<Country[]>>
  setModalVisible: Dispatch<SetStateAction<boolean>>
}

const CountryItem: React.FC<CountryItemProps> = ({
  item,
  setValues,
  setCountryItems,
  setModalVisible
}) => {
  function onSelectCountry(countryItem: Country) {
    setValues((prev) => ({ ...prev, homeCountry: countryItem.value }))
    setCountryItems([])
    setModalVisible(false)
  }

  return (
    <Pressable
      style={styles.container}
      key={item.id}
      onPress={() => {
        onSelectCountry(item)
      }}
    >
      <Text style={styles.text}>{item.value}</Text>
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

export default CountryItem
