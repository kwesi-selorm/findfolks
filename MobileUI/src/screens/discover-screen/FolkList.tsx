import { Alert, FlatList, StyleSheet, View } from 'react-native'
import FolkItem, { FolkType } from '../../components/FolkItem'
import ListSeparator from '../../components/ListSeparator'
import React from 'react'
import AppModal from '../../components/AppModal'
import FolkProfile from '../../components/FolkProfile'
import AppButton from '../../components/AppButton'
import { appColors } from '../../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'

type FolkListProps = {
  data: FolkType[]
}

const FolkList = ({ data }: FolkListProps) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [selectedFolk, setSelectedFolk] = React.useState<FolkType | null>(null)

  function onConnectButtonPress() {
    Alert.alert('', 'Would you like to send a connection request to ' + selectedFolk?.name + '?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ])
  }

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

        {/*Connect button*/}
        <AppButton
          backgroundColor={appColors.green}
          onPress={onConnectButtonPress}
          accessibilityLabel="Connect button"
          icon={<Ionicons name="person-add" size={20} color={appColors.white} />}
          text="Connect"
          color="white"
          size="medium"
          style={styles.connectButton}
        />
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
  },
  connectButton: {
    marginTop: 10,
    alignSelf: 'center'
  }
})

export default FolkList
