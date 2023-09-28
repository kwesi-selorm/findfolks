import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { appFont } from '../styles'

interface AppButtonProps {
  icon?: React.ReactNode
  text: string
  color?: string
  backgroundColor: string
  accessibilityLabel: string
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
  style?: StyleProp<ViewStyle>
}

const AppButton = ({
  color,
  icon,
  text,
  onPress,
  backgroundColor,
  accessibilityLabel,
  size,
  style
}: AppButtonProps) => {
  let fontSize, width
  switch (size) {
    case 'small':
      fontSize = 12
      width = 120
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
      width = 100
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      width: width,
      borderRadius: 10
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
      color: color ?? '#fff',
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
