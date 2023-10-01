import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import AppButton from '../../components/AppButton'
import { appColors } from '../../styles'
import FolkItem, { FolkType } from '../../components/FolkItem'
import React, { useEffect } from 'react'
import requests from '../../mock-data/requests'
import AppModal from '../../components/AppModal'
import FolkProfile from '../../components/FolkProfile'
import ActionIcons from './ActionIcons'
import ListSeparator from '../../components/ListSeparator'
import EmptyComponent from './EmptyComponent'

export enum RequestType {
  RECEIVED = 'received',
  SENT = 'sent'
}

const RequestsScreen = () => {
  const [requestType, setRequestType] = React.useState<RequestType>(RequestType.RECEIVED)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [selectedFolk, setSelectedFolk] = React.useState<FolkType | null>(null)
  const [list, setList] = React.useState<FolkType[]>([])

  useEffect(() => {
    setList(requests[requestType])
  }, [requestType])

  return (
    <SafeAreaView style={styles.container}>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <FolkProfile folk={selectedFolk} />
      </AppModal>

      {/*Buttons*/}
      <View style={styles.buttons}>
        <AppButton
          text="Received"
          accessibilityLabel="Received requests button"
          backgroundColor={appColors.green}
          onPress={() => {
            setRequestType(RequestType.RECEIVED)
          }}
          style={[
            styles.button,
            requestType === 'received' ? styles.buttonActive : styles.buttonInactive
          ]}
        />
        <AppButton
          text="Sent"
          accessibilityLabel="Sent requests button"
          backgroundColor={appColors.green}
          onPress={() => {
            setRequestType(RequestType.SENT)
          }}
          style={[
            styles.button,
            requestType === 'sent' ? styles.buttonActive : styles.buttonInactive
          ]}
        />
      </View>

      {/*List*/}
      <View style={styles.list}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <FolkItem
                item={item}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setSelectedFolk={setSelectedFolk}
              />
              <ActionIcons requestType={requestType} item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={EmptyComponent}
          ItemSeparatorComponent={ListSeparator}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  list: {
    marginTop: 20,
    marginHorizontal: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
    // justifyContent: 'space-around',
    // width: '90%'
    // marginBottom: 20
  },
  button: {
    borderRadius: 0,
    borderWidth: 1,
    borderColor: appColors.white,
    minWidth: 150
  },
  buttonActive: {
    backgroundColor: appColors.darkBlue,
    borderColor: appColors.darkBlue
  },
  buttonInactive: {
    backgroundColor: appColors.grey,
    borderColor: appColors.grey
  }
})

export default RequestsScreen
