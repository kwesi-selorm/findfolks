import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native'

import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import CommunityScreen from './screens/community'
import DiscoverScreen from './screens/discover'
import { Icon } from '@rneui/themed'

interface Route {
  route: RouteProp<ParamListBase, string>
  navigation: BottomTabNavigationProp<ParamListBase, string>
}
interface TabBarIconProps {
  focused: boolean
  color: string
  size: number
}

function getScreenOptions() {
  return ({ route, navigation }: Route) => ({
    tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
      let iconName = ''
      let screenName = ''
      if (route.name === 'Discover') {
        iconName = focused ? 'location' : 'location-outline'
        screenName = 'Discover'
      } else if (route.name === 'Community') {
        iconName = focused ? 'people-sharp' : 'people-outline'
        screenName = 'Community'
      }

      return (
        <Icon
          type="ionicon"
          name={iconName}
          size={size}
          color={color}
          onPress={() => {
            navigation.navigate(screenName)
          }}
        />
      )
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray'
  })
}

export default function App() {
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
