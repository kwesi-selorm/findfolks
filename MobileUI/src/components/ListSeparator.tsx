import { StyleSheet, View } from 'react-native'

const ListSeparator = () => {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: 'lightgray',
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8
  }
})

export default ListSeparator
