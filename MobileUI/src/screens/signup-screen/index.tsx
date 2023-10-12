import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Form from '../../components/form'
import FormItem from '../../components/form/FormItem'
import AppInput from '../../components/form/AppInput'
import React, { useState } from 'react'
import AppButton from '../../components/AppButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { appColors, appFont } from '../../styles'
import ButtonGroup from '../../components/form/ButtonGroup'
import AppPressable from '../../components/AppPressable'

type LoginValues = {
  username: string
  password: string
}
const initialValues: LoginValues = {
  username: '',
  password: ''
}

const SignupScreen = () => {
  const [values, setValues] = useState(initialValues)
  const navigation = useNavigation<NavigationProp<ParamListBase, 'Home'>>()

  function navigateToHome() {
    navigation.navigate('Home')
  }
  function navigateToLoginScreen() {
    navigation.navigate('Login')
  }

  function updateValues(value: string, fieldName: string) {
    setValues((prev) => ({ ...prev, [fieldName]: value }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Form>
        {/*Username*/}
        <FormItem label="Username">
          <AppInput
            onChangeText={(text) => {
              updateValues(text, 'username')
            }}
            placeholder="What do your folks know you by?"
          />
        </FormItem>

        {/*Password */}
        <FormItem label="Password">
          <AppInput
            onChangeText={(text) => {
              updateValues(text, 'password')
            }}
            placeholder="What's your password?"
          />
        </FormItem>

        {/*Buttons*/}
        <ButtonGroup>
          <AppButton
            text="Cancel"
            backgroundColor={appColors.grey}
            accessibilityLabel="Cancel button"
            onPress={navigateToHome}
            outline
          />
          <AppButton
            text="Sign me up!"
            backgroundColor={appColors.green}
            accessibilityLabel="Return to login screen"
            onPress={navigateToLoginScreen}
          />
        </ButtonGroup>

        {/*Prompt*/}
        <Text style={styles.prompt}>Already have a folk account? </Text>
        <AppPressable onPress={navigateToLoginScreen} accessibilityLabel="Return to login screen">
          <Text style={styles.loginText}>Return to Login</Text>
        </AppPressable>
      </Form>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  prompt: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: appFont.regular,
    fontSize: 15
  },
  loginText: {
    color: appColors.blue,
    fontSize: 16,
    fontFamily: appFont.bold,
    textAlign: 'center',
    alignSelf: 'center'
  }
})

export default SignupScreen
