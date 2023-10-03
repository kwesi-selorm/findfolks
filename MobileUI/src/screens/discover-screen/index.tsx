import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import HeaderPhotoButton from '../../components/HeaderPhotoButton'
import { FC, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import FolkList from './FolkList'
import { folksToDiscover } from '../../mock-data/folks-to-discover'
import { ParamListBase } from '@react-navigation/native'

type DiscoverScreenProps = {
  navigation: NativeStackNavigationProp<ParamListBase>
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
