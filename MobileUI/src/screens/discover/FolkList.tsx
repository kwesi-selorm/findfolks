import { FlatList, StyleSheet, Text, View } from 'react-native'
import FolkItem, { FolkType } from './FolkItem'
import ListSeparator from '../../components/ListSeparator'
import React from 'react'
import AppModal from '../../components/AppModal'
import FolkProfile from '../../components/FolkProfile'

type FolkListProps = {
  data: FolkType[]
}

const FolkList = ({ data }: FolkListProps) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [selectedFolk, setSelectedFolk] = React.useState<FolkType | null>(null)

  return (
    <View>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDismiss={() => {
          setModalVisible((prevState) => !prevState)
        }}
      >
        <FolkProfile folk={selectedFolk} />
      </AppModal>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <FolkItem
              item={item}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setSelectedFolk={setSelectedFolk}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={{ width: '100%' }}
          ItemSeparatorComponent={ListSeparator}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    textAlign: 'left',
    width: '100%'
  }
})

export default FolkList
