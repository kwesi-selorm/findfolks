import {Button, ButtonProps,  StyleSheet, View} from 'react-native'

interface AppButtonProps extends ButtonProps {
  color?: string
  containerColor: string
  accessibilityLabel: string
}

const AppButton = ({
  color,
  title,
  onPress,
  containerColor,
  accessibilityLabel,
}: AppButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: containerColor,
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%'
    }
  })

  return (
    <View style={[styles.container]}>
      <Button
        color={color ?? '#fff'}
        title={title}
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
      />
    </View>
  )
}

export default AppButton
