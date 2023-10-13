import React, { useEffect, useMemo } from 'react'
import ToastContext, { NotificationType } from './ToastContext'
import { appColors } from '../../styles'

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [type, setType] = React.useState<NotificationType>('success')
  const [duration, setDuration] = React.useState(5000)
  const [position, setPosition] = React.useState(0)

  function toast({
    message,
    type,
    duration,
    position
  }: {
    message: string
    type: NotificationType
    duration?: number
    position?: number
  }) {
    setVisible(true)
    setType(type)
    setMessage(message)
    setDuration(duration ?? 5000)
    setPosition(position ?? 100)
  }

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false)
      }, duration)
    }
  }, [duration, visible])

  function getTypeColor(type: NotificationType) {
    switch (type) {
      case 'success':
        return appColors.green
      case 'error':
        return appColors.red
      case 'info':
        return appColors.black
      default:
        return appColors.darkBlue
    }
  }

  const value = useMemo(
    () => ({
      visible,
      setVisible,
      message,
      setMessage,
      type,
      setType,
      duration,
      setDuration,
      toast,
      getTypeColor,
      position,
      setPosition
    }),
    [visible, message, type, duration, position]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastProvider
