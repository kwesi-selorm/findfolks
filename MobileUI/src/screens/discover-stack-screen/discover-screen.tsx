import { StyleSheet, View } from 'react-native'
import FolkList from './FolkList'
import { folksToDiscover } from '../../mock-data/folks-to-discover'
import HeaderPhotoButton from '../../components/HeaderPhotoButton'
import { FC, useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from './index'

type DiscoverScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Discover'>
}

const DiscoverScreen: FC<DiscoverScreenProps> = ({ navigation }) => {
  useEffect(() => {
    function navigateToProfileScreen() {
      navigation.navigate('Profile')
    }
    function getHeaderRightValue() {
      return () => <HeaderPhotoButton onPress={navigateToProfileScreen} />
    }

    navigation.setOptions({
      headerRight: getHeaderRightValue()
    })
  }, [navigation])

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
