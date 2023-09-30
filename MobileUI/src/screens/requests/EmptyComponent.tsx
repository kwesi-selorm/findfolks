import React from 'react'
import { Text } from 'react-native'
import { RequestType } from './index'

const EmptyComponent = ({ requestType }: { requestType: RequestType }) => {
  return (
    <Text>
      No requests {requestType == RequestType.RECEIVED ? RequestType.RECEIVED : RequestType.SENT}
      yet
    </Text>
  )
}

export default EmptyComponent
