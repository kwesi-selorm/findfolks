import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { appColors } from '../styles'

interface AppModalProps {
  animationType?: 'slide' | 'fade' | 'none'
  children: React.ReactNode
  modalVisible: boolean
  onDismiss: () => void
}

const AppModal = ({
  animationType = 'slide',
  children,
  modalVisible,
  onDismiss
}: AppModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType={animationType} visible={modalVisible} onRequestClose={onDismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close"
              color={appColors.darkGrey}
              size={35}
              onPress={onDismiss}
              style={styles.closeIcon}
            />
            {children}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  closeIcon: {
    marginBottom: 20,
    alignSelf: 'flex-end'
  },
  modalView: {
    marginTop: 80
  }
})

export default AppModal
