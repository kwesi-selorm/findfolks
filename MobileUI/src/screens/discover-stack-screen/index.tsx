import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import DiscoverScreen from './discover-screen'
import ProfileScreen from './profile-screen'
import HeaderPhotoButton from '../../components/HeaderPhotoButton'
import HeaderTitle from '../../components/HeaderTitle'

export type RootStackParamList = {
  Discover: undefined
  Profile: undefined
}
function createHeaderRightValue(
  navigation: NativeStackNavigationProp<RootStackParamList, 'Discover'>
) {
  return () => <HeaderPhotoButton onPress={() => navigation.navigate('Profile')} />
}
function createHeaderTitleValue(title: string) {
  return () => <HeaderTitle title={title} />
}

const DiscoverStack = createNativeStackNavigator<RootStackParamList>()

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={({ navigation }) => ({
          headerTitle: createHeaderTitleValue('Discover'),
          headerRight: createHeaderRightValue(navigation)
        })}
      />
      <DiscoverStack.Screen name="Profile" component={ProfileScreen} />
    </DiscoverStack.Navigator>
  )
}

export default DiscoverStackScreen
