import React from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
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
            {children}
            <Pressable style={{ alignSelf: 'center', marginTop: 100 }} onPress={onDismiss}>
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
