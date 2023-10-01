import React from 'react'
import { Text, View } from 'react-native'
import { RequestType } from './index'

const EmptyComponent = ({ requestType }: { requestType: RequestType }) => {
  return (
    <View>
      <Text>
        No requests {requestType == RequestType.RECEIVED ? RequestType.RECEIVED : RequestType.SENT}
        yet
      </Text>
    </View>
  )
}

export default EmptyComponent
