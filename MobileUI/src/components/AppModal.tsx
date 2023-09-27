import {Modal, Pressable, StyleSheet, View} from 'react-native'
import React, { SetStateAction } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

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
            <Pressable style={{alignSelf: 'flex-end'}}  onPress={onDismiss}>
              <Ionicons name="close-circle-outline" color="black" size={30}/>
            </Pressable>
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
    justifyContent: 'center',
    alignItems: 'center'
    // paddingTop: '25%'
  },
  modalView: {
    marginTop: 80
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
