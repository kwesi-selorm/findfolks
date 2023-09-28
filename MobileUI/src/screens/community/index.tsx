import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import ConnectionCard from './ConnectionCard'
import { connections } from '../../mock-data/connections'
import React from 'react'

type CommunityScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CommunityScreen = ({ navigation }: CommunityScreenProps) => {
  const [selectedConnectionId, setSelectedConnectionId] = React.useState<number | null>(null)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={connections}
        renderItem={({ item }) => <ConnectionCard connection={item} />}
        keyExtractor={(item) => item.id.toString()}
        // numColumns={2}
        // horizontal={false}
        extraData={selectedConnectionId}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
    padding: 10
  },
  list: {
    paddingTop: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    // gap: 10,
    maxWidth: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  text: {
    fontWeight: 'bold',
    // alignSelf: 'center',
    color: 'red'
  }
})

export default CommunityScreen
