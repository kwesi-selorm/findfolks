import { StyleSheet, View } from 'react-native'

const ListSeparator = () => {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: 'lightgray',
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default ListSeparator
