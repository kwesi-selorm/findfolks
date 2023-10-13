import React, { FC, useEffect, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { appColors } from '../styles'

type LoadingIconProps = {
  size?: number
  color?: string
}
const defaultSize = 24

const LoadingIcon: FC<LoadingIconProps> = ({ size = defaultSize, color = appColors.darkGrey }) => {
  const [rotation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ).start()
  }, [])

  const interpolatedRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: interpolatedRotation
            }
          ]
        }}
      >
        <FeatherIcon name="loader" size={size} color={color} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoadingIcon
