import { Alert, Image, Pressable, StyleSheet, View } from 'react-native'
import { torProfilePhoto } from '../mock-data/bas64strings'

const HeaderPhoto = () => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          Alert.alert('Go to profile screen')
        }}
      >
        <Image
          style={styles.photo}
          source={{
            uri: `data:image/png;base64,${torProfilePhoto}`
          }}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30
  },
  photo: {
    width: 35,
    height: 35,
    borderRadius: 18
  }
})

export default HeaderPhoto
