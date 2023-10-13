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
import { useMutation } from '@tanstack/react-query'
import { logIn } from '../../api/auth-api'
import { parseError } from '../../util/error-parser'
import LoadingIcon from '../../components/LoadingIcon'

type LoginValues = {
  username: string
  password: string
}
const initialValues: LoginValues = {
  username: 'Jeffery',
  password: 'Jeffery*7'
}

const LoginScreen = () => {
  const [values, setValues] = useState(initialValues)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { toast } = useContext(ToastContext)
  const { isAuthenticated, setIsAuthenticated, setLoggedInUser } = useContext(AuthContext)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (credentials: LoginValues) => logIn(credentials),
    retry: 1
  })

  function updateValues(value: string, fieldName: string) {
    setValues((prev) => ({ ...prev, [fieldName]: value }))
  }

  function returnToHome() {
    navigation.navigate('Home')
  }
  async function submitLoginRequest() {
    if (isAuthenticated) {
      navigation.navigate('Tabs')
      return
    }

    try {
      const response = await mutateAsync(values)
      if (response != null) {
        setLoggedInUser(response)
        setIsAuthenticated(true)
        navigation.navigate('Tabs')
        toast({
          message: `Welcome back, ${response.username}`,
          type: 'info',
          position: 0
        })
      }
    } catch (e) {
      const errorData = parseError(e)
      toast({
        message: errorData.message,
        type: 'error',
        duration: 10000
      })
      if (errorData.status === 401) {
        setIsAuthenticated(false)
        navigation.navigate('Login')
      }
    }
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
            value={values.username}
          />
        </FormItem>
        <FormItem label="Password">
          <AppInput
            onChangeText={(text) => {
              updateValues(text, 'password')
            }}
            placeholder="What's your password?"
            value={values.password}
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
            text={isLoading ? 'Logging in...' : 'Log in'}
            backgroundColor={appColors.green}
            accessibilityLabel="Login button"
            onPress={submitLoginRequest}
            icon={
              isLoading ? (
                <LoadingIcon size={20} color={appColors.white} />
              ) : (
                <AntDesignIcon name="login" size={20} color={appColors.white} />
              )
            }
            disabled={isLoading}
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
