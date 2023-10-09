import { FC } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { appColors, appFont, widths } from '../../styles'
import InputErrorMessage from './InputErrorMessage'

type AppInputProps = {
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void
  keyboardType?: 'default' | 'decimal-pad' | 'url'
  placeholder: string
  value?: string
  multiline?: boolean
  hasError?: boolean
  errorMessage?: string
}

const AppInput: FC<AppInputProps> = ({
  onChangeText,
  placeholder,
  keyboardType,
  value,
  multiline,
  hasError,
  errorMessage
}) => {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
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
      {hasError ? <InputErrorMessage message={errorMessage} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: appFont.regular,
    borderWidth: 1,
    borderColor: appColors.grey,
    padding: 5,
    maxWidth: '100%',
    minWidth: widths.formWidth
  }
})

export default AppInput
