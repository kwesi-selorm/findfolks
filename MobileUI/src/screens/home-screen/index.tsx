import { SafeAreaView, StyleSheet, Text } from 'react-native'
import ButtonGroup from '../../components/form/ButtonGroup'
import AppButton from '../../components/AppButton'
import { appColors, appFont } from '../../styles'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import AppPressable from '../../components/AppPressable'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
          text="Get started"
          icon={<Ionicons name="ios-play" size={25} color={appColors.white} />}
          backgroundColor={appColors.darkBlue}
          color={appColors.white}
          accessibilityLabel="Register button"
          onPress={navigateToSignupScreen}
          size="large"
        />
      </ButtonGroup>
      <Text style={styles.prompt}>Already a folk?</Text>
      <AppPressable onPress={navigateToLoginScreen} accessibilityLabel="Go to login button">
        <Text style={styles.signUpText}>Continue exploring</Text>
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
