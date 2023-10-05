import { FC } from 'react'
import { FlatList, ListRenderItem, StyleSheet, TextInput, View } from 'react-native'
import { appColors, appFont, widths } from '../styles'

interface DropdownProps {
  placeholder?: string
  value: any
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void
  data: any[]
  renderItem: ListRenderItem<any> | null | undefined
}

const SearchList: FC<DropdownProps> = ({
  placeholder = 'Search',
  value,
  onChangeText,
  data,
  renderItem
}) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <FlatList data={data} renderItem={renderItem} contentContainerStyle={{ maxHeight: '100%' }} />
    </View>
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

export default SearchList
