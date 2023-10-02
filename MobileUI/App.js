import { NavigationContainer } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DiscoverStackScreen from './src/screens/discover-stack-screen'
import CommunityScreen from './src/screens/community-screen'
import { useFonts } from 'expo-font'
import { appColors, customFonts } from './src/styles'
import RequestsScreen from './src/screens/requests-screen'
import HeaderTitle from './src/components/HeaderTitle'
// expo install expo-font

function getScreenOptions() {
  return ({ route, navigation }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = ''
      let screenName = ''
      if (route.name === 'DiscoverStack') {
        iconName = focused ? 'search-sharp' : 'search-outline'
        screenName = 'DiscoverStack'
      } else if (route.name === 'Community') {
        iconName = focused ? 'people-sharp' : 'people-outline'
        screenName = 'Community'
      } else if (route.name === 'Requests') {
        iconName = focused ? 'person-add' : 'person-add-outline'
        screenName = 'Requests'
      }

      return (
        <View>
          <Icon
            name={iconName}
            size={size}
            color={color}
            style={{ marginTop: 5 }}
            onPress={() => {
              navigation.navigate(screenName)
            }}
          />
        </View>
      )
    },
    tabBarActiveTintColor: appColors.darkBlue,
    tabBarInactiveTintColor: appColors.grey
  })
}

function createHeaderTitle(title) {
  return () => <HeaderTitle title={title} />
}

export default function App() {
  const [fontsLoaded] = useFonts(customFonts)
  if (!fontsLoaded) {
    return null
  }

  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="DiscoverStackScreen" screenOptions={getScreenOptions()}>
        <Tab.Screen
          name="DiscoverStack"
          component={DiscoverStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            headerTitle: createHeaderTitle('Community')
          }}
        />
        <Tab.Screen
          name="Requests"
          component={RequestsScreen}
          options={{
            headerTitle: createHeaderTitle('Requests')
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
