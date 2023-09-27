import { NavigationProp, ParamListBase } from '@react-navigation/native'
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
    homeCountry: 'Ghana',
    profilePhoto: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: 2,
    name: 'Bob',
    countryOfResidence: 'Norway',
    cityOrTownOfResidence: 'Bergen',
    homeCountry: 'Togo',
    homeCityOrTown: 'Lomé',
    profilePhoto: 'https://reactnative.dev/img/tiny_logo.png'
  }
] as FolkType[]

const DiscoverScreen = ({ navigation }: DiscoverScreenProps) => {
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
