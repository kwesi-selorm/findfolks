import { Modal, StyleSheet, View } from 'react-native'
import React, { SetStateAction } from 'react'
import AppButton from './AppButton'

interface AppModalProps {
  children: React.ReactNode
  modalVisible: boolean
  setModalVisible: React.Dispatch<SetStateAction<boolean>>
  onDismiss: () => void
}

const AppModal = ({ children, modalVisible, onDismiss }: AppModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalVisible} onRequestClose={onDismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <AppButton
              containerColor="gray"
              accessibilityLabel="Close"
              title="Close"
              onPress={onDismiss}
            ></AppButton>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '25%'
  },
  modalView: {
    // // margin: 20,
    // backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    // width: '80%',
    // height: '80%'
  }
})

export default AppModal
