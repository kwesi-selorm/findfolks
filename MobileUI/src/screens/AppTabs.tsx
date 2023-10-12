import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { appColors } from '../styles'
import HeaderTitle from '../components/HeaderTitle'
import HeaderPhotoButton from '../components/HeaderPhotoButton'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import DiscoverScreen from './discover-screen'
import CommunityScreen from './community-screen'
import RequestsScreen from './requests-screen'
import ProfileScreen from './profile-screen'

function getScreenOptions() {
  return ({
    route,
    navigation
  }: {
    route: RouteProp<ParamListBase>
    navigation: NavigationProp<ParamListBase>
  }) => ({
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
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

function createHeaderTitle(title: string) {
  return () => <HeaderTitle title={title} />
}
function createHeaderRight(navigation: NavigationProp<ParamListBase>) {
  return () => (
    <HeaderPhotoButton
      onPress={() => {
        navigation.navigate('Profile')
      }}
    />
  )
}

const AppTabs = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator initialRouteName="Discover" screenOptions={getScreenOptions()}>
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={({ navigation }) => ({
          headerTitle: createHeaderTitle('Discover'),
          headerTitleAlign: 'left',
          headerRight: createHeaderRight(navigation)
        })}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerTitle: createHeaderTitle('Community'),
          headerTitleAlign: 'left'
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          headerTitle: createHeaderTitle('Requests'),
          headerTitleAlign: 'left'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: createHeaderTitle('Profile'),
          headerTitleAlign: 'left'
        }}
      />
    </Tab.Navigator>
  )
}

export default AppTabs
