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
import { useMutation, useQuery } from '@tanstack/react-query'
import { logIn } from '../../api/auth-api'
import { parseError } from '../../util/error-parser'
import { getFolkProfile } from '../../api/folk-api'
import FolkContext from '../../contexts/folk-context/FolkContext'

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
  const { setIsAuthenticated, loggedInUser, setLoggedInUser } = useContext(AuthContext)
  const { setFolkProfile } = useContext(FolkContext)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (credentials: LoginValues) => logIn(credentials),
    retry: 1
  })
  const { data, isError, error } = useQuery(
    ['folk-profile', loggedInUser],
    () => {
      if (loggedInUser == null) return
      return getFolkProfile(loggedInUser.id)
    },
    {
      enabled: !!loggedInUser
    }
  )

  if (isError) {
    const errorData = parseError(error)
    toast({
      message: errorData.message,
      type: 'error',
      duration: 10000
    })
    return
  }

  function updateValues(value: string, fieldName: string) {
    setValues((prev) => ({ ...prev, [fieldName]: value }))
  }

  function returnToHome() {
    navigation.navigate('Home')
  }
  async function submitLoginRequest() {
    try {
      const response = await mutateAsync(values)
      if (response != null) {
        setLoggedInUser(response)
        if (data != null) {
          setFolkProfile(data)
        }
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
