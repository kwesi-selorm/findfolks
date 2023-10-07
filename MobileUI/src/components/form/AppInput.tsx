import { FC } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { appColors, appFont, widths } from '../../styles'

type AppInputProps = {
  keyboardType?: 'default' | 'decimal-pad' | 'url'
  placeholder: string
  value?: string
  multiline?: boolean
}

const AppInput: FC<AppInputProps> = ({ placeholder, keyboardType, value, multiline }) => {
  return (
    <TextInput
      clearButtonMode="while-editing"
      cursorColor={appColors.darkBlue}
      enablesReturnKeyAutomatically={true}
      enterKeyHint="done"
      keyboardAppearance="default"
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      style={styles.textInput}
      multiline={multiline}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: appFont.regular,
    borderBottomWidth: 1,
    borderColor: appColors.grey,
    padding: 5,
    maxWidth: '80%',
    minWidth: widths.formWidth
  }
})

export default AppInput
