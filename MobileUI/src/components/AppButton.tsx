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
  backgroundColor: string
  accessibilityLabel: string
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
  style?: StyleProp<ViewStyle>
  outline?: boolean
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
  outline
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
    container: {
      backgroundColor: outline ? 'none' : backgroundColor,
      width: width,
      borderRadius: 10,
      borderWidth: outline ? 2 : 0,
      borderColor: outline ? backgroundColor ?? appColors.darkBlue : 'none'
    },
    button: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      justifyContent: 'center',
      width: '100%',
      gap: 10
    },
    text: {
      color: outline ? color ?? appColors.black : color ?? appColors.white,
      fontFamily: appFont.regular,
      fontSize: fontSize
    }
  })

  return (
    <View style={style ? [styles.container, style] : [styles.container]}>
      <Pressable accessibilityLabel={accessibilityLabel} onPress={onPress} style={styles.button}>
        {icon ?? null}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
}

export default AppButton
