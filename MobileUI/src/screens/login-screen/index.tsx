import { SafeAreaView, StyleSheet } from 'react-native'
import Form from '../../components/form'
import FormItem from '../../components/form/FormItem'
import AppInput from '../../components/form/AppInput'
import React, { useState } from 'react'
import AppButton from '../../components/AppButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { appColors } from '../../styles'
import ButtonGroup from '../../components/form/ButtonGroup'

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
  const navigation = useNavigation<NavigationProp<ParamListBase, 'Home'>>()

  function returnToHome() {
    navigation.navigate('Home')
  }

  function updateValues(value: string, fieldName: string) {
    setValues((prev) => ({ ...prev, [fieldName]: value }))
  }

  return (
    <SafeAreaView style={styles.container}>
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
            text="Login"
            backgroundColor={appColors.green}
            accessibilityLabel="Login button"
            onPress={returnToHome}
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
