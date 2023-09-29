import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'

import FolkList from './FolkList'
import { folksToDiscover } from '../../mock-data/folks-to-discover'

type DiscoverScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const DiscoverScreen = ({ navigation }: DiscoverScreenProps) => {
  return (
    <View style={styles.container}>
      <FolkList data={folksToDiscover} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  }
})

export default DiscoverScreen
