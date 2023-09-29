import { Modal, Pressable, StyleSheet, View } from 'react-native'
import React, { SetStateAction } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { appColors } from '../styles'

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
            <Pressable style={{ alignSelf: 'center' }} onPress={onDismiss}>
              <Ionicons name="close-circle-outline" color={appColors.red} size={35} />
            </Pressable>
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
    width: '100%'
  },
  modalView: {
    marginTop: 150
  }
})

export default AppModal
