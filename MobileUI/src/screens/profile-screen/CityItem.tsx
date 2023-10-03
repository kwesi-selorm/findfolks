import React, { Dispatch, SetStateAction } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { City } from '../../@types'
import { appColors } from '../../styles'

type CityItemProps = {
  item: City
  setSelectedCity: Dispatch<SetStateAction<City | null>>
}

const CityItem: React.FC<CityItemProps> = ({ item, setSelectedCity }) => {
  const city = item.value
  const country = item.label.split(', ')[1]

  return (
    <Pressable style={styles.container} key={item.id} onPress={() => setSelectedCity(item)}>
      <Text>
        {city} ({country})
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    borderColor: appColors.white,
    borderWidth: 0.5,
    backgroundColor: appColors.grey,
    width: '50%',
    padding: 5
  }
})

export default CityItem
