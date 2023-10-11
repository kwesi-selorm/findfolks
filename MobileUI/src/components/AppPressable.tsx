import React, { FC } from 'react'
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { appColors, appBorderRadius } from '../styles'

interface AppPressableProps extends PressableProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress: () => void
  accessibilityLabel?: string
}

const AppPressable: FC<AppPressableProps> = ({ children, style, onPress, accessibilityLabel }) => {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: appBorderRadius.pressablePressedRadius
    }
  })
  function createPressedStyles(pressed: boolean) {
    return pressed
      ? [
          styles.container,
          style,
          {
            backgroundColor: appColors.grey,
            borderWidth: 0
          }
        ]
      : [styles.container, style]
  }

  return (
    <Pressable
      style={({ pressed }) => createPressedStyles(pressed)}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Pressable>
  )
}

export default AppPressable
