import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './login-screen'
import SignupScreen from './signup-screen'
import { NavigationContainer } from '@react-navigation/native'

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigator
