import { useContext } from 'react'
import ToastContext from '../contexts/toast-context/ToastContext'
import Toast from 'react-native-root-toast'
import { appColors, appFont } from '../styles'

const AppToast = () => {
  const { message, type, visible, position } = useContext(ToastContext)

  function setTextColor(): string {
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

  return (
    <Toast
      position={position}
      shadow={true}
      shadowColor={appColors.grey}
      animation={true}
      hideOnPress={true}
      delay={0}
      textColor={setTextColor()}
      textStyle={{
        fontFamily: appFont.regular,
        fontSize: 15
      }}
      opacity={1}
      backgroundColor={appColors.white}
      visible={visible}
    >
      {message}
    </Toast>
  )
}

export default AppToast
