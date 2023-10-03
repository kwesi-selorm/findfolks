import { NavigationContainer } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DiscoverScreen from './src/screens/discover-screen'
import CommunityScreen from './src/screens/community-screen'
import { useFonts } from 'expo-font'
import { appColors, customFonts } from './src/styles'
import RequestsScreen from './src/screens/requests-screen'
import HeaderTitle from './src/components/HeaderTitle'
import ProfileScreen from './src/screens/profile-screen'
import HeaderPhotoButton from './src/components/HeaderPhotoButton'
// expo install expo-font

function getScreenOptions() {
  return ({ route, navigation }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = ''
      let screenName = ''

      switch (route.name) {
        case 'Discover':
          iconName = focused ? 'search-sharp' : 'search-outline'
          screenName = 'Discover'
          break
        case 'Community':
          iconName = focused ? 'people-sharp' : 'people-outline'
          screenName = 'Community'
          break
        case 'Requests':
          iconName = focused ? 'person-add' : 'person-add-outline'
          screenName = 'Requests'
          break
        case 'Profile':
          iconName = focused ? 'person-sharp' : 'person-outline'
          screenName = 'Profile'
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
function createHeaderRight(navigation) {
  return () => (
    <HeaderPhotoButton
      onPress={() => {
        navigation.navigate('Profile')
      }}
    />
  )
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
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={({ navigation }) => ({
            headerTitle: createHeaderTitle('Discover'),
            headerRight: createHeaderRight(navigation)
          })}
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
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: createHeaderTitle('Profile')
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
