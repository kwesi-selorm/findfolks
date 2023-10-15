import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { appBorderRadius, appColors, appFont, widths } from '../../styles'

interface AppInputProps extends TextInputProps {
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: string) => void
  keyboardType?: 'default' | 'decimal-pad' | 'url'
  placeholder: string
  value?: string
  multiline?: boolean
  onPressIn?: () => void
}

const AppInput: FC<AppInputProps> = ({
  onChangeText,
  placeholder,
  keyboardType,
  value,
  multiline,
  onPressIn
}) => {
  return (
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
      onPressIn={onPressIn}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: appFont.regular,
    borderWidth: 1,
    borderColor: appColors.grey,
    borderRadius: appBorderRadius.pressablePressedRadius,
    padding: 10,
    maxWidth: '100%',
    minWidth: widths.formWidth,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default AppInput
