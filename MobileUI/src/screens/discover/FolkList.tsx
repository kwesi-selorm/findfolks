import { FlatList, StyleSheet, View } from 'react-native'
import FolkItem, { FolkType } from './FolkItem'
import ListSeparator from '../../components/ListSeparator'

type FolkListProps = {
  data: FolkType[]
}

const FolkList = ({ data }: FolkListProps) => {
  return (
    <View style={styles.list}>
      <FlatList
        data={data}
        renderItem={({ item }) => <FolkItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '100%' }}
        ItemSeparatorComponent={ListSeparator}
      />
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
