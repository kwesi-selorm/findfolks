import { Image, ImageProps, StyleSheet, View } from 'react-native'

interface AppImageProps extends ImageProps {
  width?: number
}

const AppImage = ({ width = 100, source }: AppImageProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      textAlign: 'center',
      height: '100%'
    },
    img: {
      width: width,
      height: 'auto'
    }
  })

  return (
    <View>
      <Image source={source} style={styles.img} />
    </View>
  )
}

export default AppImage
