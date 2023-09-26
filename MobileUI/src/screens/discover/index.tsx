import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FolkList from './FolkList'
import { FolkType } from './FolkItem'

type DiscoverScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const data = [
  {
    id: 1,
    name: 'Stanley',
    countryOfResidence: 'USA',
    cityOrTownOfResidence: 'New York',
    profilePhoto: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: 2,
    name: 'Bob',
    countryOfResidence: 'Norway',
    cityOrTownOfResidence: 'Bergen',
    profilePhoto: 'https://reactnative.dev/img/tiny_logo.png'
  }
] as FolkType[]

const DiscoverScreen = ({ navigation }: DiscoverScreenProps) => {
  const [selectedFolkId, setSelectedFolkId] = useState<number | null>(null)

  return (
    <SafeAreaView style={styles.container}>
      <FolkList data={data} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // textAlign: 'center',
    height: '100%'
  }
})

export default DiscoverScreen
