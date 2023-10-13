import React from 'react'
import {
  DimensionValue,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import { appColors, appFont } from '../styles'

interface AppButtonProps {
  icon?: React.ReactNode
  text: string
  color?: string
  backgroundColor?: string
  accessibilityLabel: string
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
  style?: StyleProp<ViewStyle>
  outline?: boolean
  disabled?: boolean
}

const AppButton = ({
  color,
  icon,
  text,
  onPress,
  backgroundColor,
  accessibilityLabel,
  size,
  style,
  outline,
  disabled
}: AppButtonProps) => {
  let fontSize, width
  switch (size) {
    case 'small':
      fontSize = 12
      width = 130
      break
    case 'medium':
      fontSize = 16
      width = 150
      break
    case 'large':
      fontSize = 20
      width = 200
      break
    default:
      fontSize = 16
      width = 'auto' as DimensionValue
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: outline ? 'none' : backgroundColor,
      width: width,
      borderRadius: 10,
      borderWidth: outline ? 2 : 0,
      borderColor: outline ? backgroundColor ?? appColors.darkBlue : 'none',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      justifyContent: 'center',
      gap: 10
    },
    text: {
      color: outline ? color ?? appColors.black : color ?? appColors.white,
      fontFamily: appFont.regular,
      fontSize: fontSize
    }
  })

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <View>{icon ?? null}</View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default AppButton
