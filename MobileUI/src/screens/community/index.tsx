import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

type CommunityScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CommunityScreen = ({ navigation }: CommunityScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Community screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    textAlign: 'center',
    height: '100%'
  },
  text: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'red'
  }
})

export default CommunityScreen
