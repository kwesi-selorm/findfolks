import React, { FC } from 'react'
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { appColors, appFont, widths } from '../styles'
import AppModal from './AppModal'

interface DropdownProps {
  placeholder?: string
  value: any
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void
  data: any[]
  renderItem: ListRenderItem<any> | null | undefined
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchList: FC<DropdownProps> = ({
  placeholder = 'Search',
  value,
  onChangeText,
  data,
  renderItem,
  modalVisible,
  setModalVisible
}) => {
  const styles = StyleSheet.create({
    textInput: {
      fontFamily: appFont.regular,
      borderBottomWidth: 1,
      borderColor: appColors.grey,
      padding: 5,
      maxWidth: '100%',
      minWidth: widths.formWidth
    },
    list: {
      maxHeight: '80%',
      overflow: 'scroll'
    }
  })

  return (
    <SafeAreaView>
      {/*MODAL*/}
      <AppModal modalVisible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        <FlatList data={data} renderItem={renderItem} style={styles.list} />
      </AppModal>

      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onPressIn={() => setModalVisible(true)}
      />
    </SafeAreaView>
  )
}

export default SearchList
