import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FolkList from './FolkList'
import { folksToDiscover } from '../../mock-data/folks-to-discover'

type DiscoverScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const DiscoverScreen = ({ navigation }: DiscoverScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <FolkList data={folksToDiscover} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  }
})

export default DiscoverScreen
