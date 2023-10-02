import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { FolkType } from '../../components/FolkItem'
import { appColors } from '../../styles'
import { RequestType } from '../../@types'

type ActionIconsProps = {
  requestType: RequestType
  item: FolkType
}
const iconSize = 18

const ActionIcons = ({ requestType, item }: ActionIconsProps) => {
  const preposition = requestType === RequestType.RECEIVED ? 'from' : 'sent to'
  const action = requestType === RequestType.RECEIVED ? 'Decline' : 'Cancel'
  function handleRequestAccept() {
    Alert.alert('', `Accept request ${preposition} ${item.name}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ])
  }
  function handleRequestDecline() {
    Alert.alert('', `${action} request ${preposition} ${item.name}?`, [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => console.log('OK Pressed') }
    ])
  }

  return requestType === RequestType.SENT ? (
    <MCIcon
      name="delete-outline"
      size={iconSize}
      color={appColors.red}
      onPress={handleRequestDecline}
    />
  ) : (
    <View style={styles.icons}>
      <FeatherIcon
        name="check-circle"
        size={iconSize}
        color={appColors.green}
        onPress={handleRequestAccept}
      />
      <MCIcon
        name="delete-outline"
        size={iconSize}
        color={appColors.red}
        onPress={handleRequestDecline}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
    // paddingHorizontal: 30,
    justifyContent: 'center',
    // width: '100%',
    gap: 10
  }
})

export default ActionIcons
