import { Image, Pressable, StyleSheet } from 'react-native'
import { torProfilePhoto } from '../mock-data/bas64strings'

type HeaderPhotoProps = {
  onPress?: () => void
  // navigation: NativeStackNavigationProp<RootStackParamList, 'Discover'>
}

const HeaderPhotoButton = ({ onPress }: HeaderPhotoProps) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        style={styles.photo}
        source={{
          uri: `data:image/png;base64,${torProfilePhoto}`
        }}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    // marginRight: 30
  },
  photo: {
    width: 35,
    height: 35,
    borderRadius: 18
  }
})

export default HeaderPhotoButton
