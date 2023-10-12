/* eslint-disable no-unused-vars */
import React from 'react'

export type NotificationType = 'success' | 'error' | 'info'

type SnackbarContextType = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  type: NotificationType
  setType: React.Dispatch<React.SetStateAction<NotificationType>>
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
  toast: ({
    message,
    type,
    duration,
    position
  }: {
    message: string
    type: NotificationType
    duration?: number
    position?: number
  }) => void
  getTypeColor: (type: NotificationType) => string
  position: number
  setPosition: React.Dispatch<React.SetStateAction<number>>
}

const initialState: SnackbarContextType = {
  visible: false,
  setVisible: () => {},
  message: '',
  setMessage: () => {},
  type: 'success',
  setType: () => {},
  duration: 5000,
  setDuration: () => {},
  toast: () => {},
  getTypeColor: () => '',
  position: 0,
  setPosition: () => {}
}

const ToastContext = React.createContext<SnackbarContextType>(initialState)

export default ToastContext
