import { SafeAreaView, StyleSheet } from 'react-native'
import Form from '../../components/form'
import FormItem from '../../components/form/FormItem'
import AppInput from '../../components/form/AppInput'
import React, { useContext, useState } from 'react'
import AppButton from '../../components/AppButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { appColors } from '../../styles'
import ButtonGroup from '../../components/form/ButtonGroup'
import AuthContext from '../../contexts/auth-context/AuthContext'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import AppToast from '../../components/AppToast'
import ToastContext from '../../contexts/toast-context/ToastContext'

type LoginValues = {
  username: string
  password: string
}
const initialValues: LoginValues = {
  username: '',
  password: ''
}

const LoginScreen = () => {
  const [values, setValues] = useState(initialValues)
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { toast } = useContext(ToastContext)

  function returnToHome() {
    navigation.navigate('Home')
  }
  function submitLoginRequest() {
    setIsAuthenticated(true)
    navigation.navigate('Tabs')
    toast({
      message: 'Logged in successfully',
      type: 'success',
      position: 0
    })
  }

  function updateValues(value: string, fieldName: string) {
    setValues((prev) => ({ ...prev, [fieldName]: value }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppToast />
      <Form>
        <FormItem label="Username">
          <AppInput
            onChangeText={(text) => {
              updateValues(text, 'username')
            }}
            placeholder="What do your folks know you by?"
          />
        </FormItem>
        <FormItem label="Password">
          <AppInput
            onChangeText={(text) => {
              updateValues(text, 'password')
            }}
            placeholder="What password did you choose?"
          />
        </FormItem>
        <ButtonGroup>
          <AppButton
            text="Cancel"
            backgroundColor={appColors.grey}
            accessibilityLabel="Cancel button"
            onPress={returnToHome}
            outline
          />
          <AppButton
            text="Log in"
            backgroundColor={appColors.green}
            accessibilityLabel="Login button"
            onPress={submitLoginRequest}
            icon={<AntDesignIcon name="login" size={20} color={appColors.white} />}
          />
        </ButtonGroup>
      </Form>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LoginScreen
