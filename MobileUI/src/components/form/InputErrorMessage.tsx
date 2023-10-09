import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

type InputErrorMessageProps = {
  message?: string
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ message }) => {
  return <View style={styles.message}>{message}</View>
}

const styles = StyleSheet.create({
  message: {
    color: 'red',
    padding: 5
  }
})

export default InputErrorMessage
