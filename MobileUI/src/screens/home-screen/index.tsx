import { SafeAreaView, StyleSheet, Text } from 'react-native'
import ButtonGroup from '../../components/form/ButtonGroup'
import AppButton from '../../components/AppButton'
import { appColors, appFont } from '../../styles'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import AppPressable from '../../components/AppPressable'
import React from 'react'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  function navigateToLoginScreen() {
    navigation.navigate('Login')
  }
  function navigateToSignupScreen() {
    navigation.navigate('Signup')
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*Logo*/}
      <Text style={styles.logo}>Findfolks</Text>

      {/*Buttons*/}
      <ButtonGroup direction="column">
        <AppButton
          text="Start"
          backgroundColor={appColors.darkBlue}
          color={appColors.white}
          accessibilityLabel="Enter button"
          onPress={navigateToLoginScreen}
          size="large"
        />
      </ButtonGroup>
      <Text style={styles.prompt}>New to Findfolks? </Text>
      <AppPressable onPress={navigateToSignupScreen} accessibilityLabel="Sign up button">
        <Text style={styles.signUpText}>Create a profile</Text>
      </AppPressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: appFont.extraBold,
    fontSize: 50,
    color: appColors.black,
    marginBottom: '50%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  prompt: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: appFont.regular
  },
  signUpText: {
    color: appColors.blue,
    fontSize: 17,
    fontFamily: appFont.bold,
    textAlign: 'center'
  }
})

export default HomeScreen
