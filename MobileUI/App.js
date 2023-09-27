import { NavigationContainer } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DiscoverScreen from './src/screens/discover'
import CommunityScreen from './src/screens/community'
import { useFonts } from 'expo-font'
// expo install expo-font

let customFonts = {
  'Bricolage Grotesque': require('./assets/fonts/BricolageGrotesque-Regular.ttf'),
  'Bricolage Grotesque Bold': require('./assets/fonts/BricolageGrotesque-Bold.ttf'),
  'Bricolage Grotesque Medium': require('./assets/fonts/BricolageGrotesque-Medium.ttf')
}

function getScreenOptions() {
  return ({ route, navigation }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = ''
      let screenName = ''
      if (route.name === 'Discover') {
        iconName = focused ? 'search-sharp' : 'search-outline'
        screenName = 'Discover'
      } else if (route.name === 'Community') {
        iconName = focused ? 'people-sharp' : 'people-outline'
        screenName = 'Community'
      }

      return (
        <View>
          <Icon
            name={iconName}
            size={size}
            color={color}
            onPress={() => {
              navigation.navigate(screenName)
            }}
          />
        </View>
      )
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray'
  })
}

export default function App() {
  const [fontsLoaded] = useFonts(customFonts)
  if (!fontsLoaded) {
    return null
  }

  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="DiscoverScreen" screenOptions={getScreenOptions()}>
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
