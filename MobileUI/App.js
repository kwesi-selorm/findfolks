import { useFonts } from 'expo-font'
import { customFonts } from './src/styles'
import TabNavigator from './src/screens/TabNavigator'
import AuthProvider from './src/contexts/auth-context/AuthProvider'
import FolkProvider from './src/contexts/folk-context/FolkProvider'
import { useContext } from 'react'
import AuthContext from './src/contexts/auth-context/AuthContext'
import AuthNavigator from './src/screens/AuthNavigator'
// expo install expo-font

export default function App() {
  const [fontsLoaded] = useFonts(customFonts)
  const { isAuthenticated } = useContext(AuthContext)

  if (!fontsLoaded) {
    return null
  }

  return (
    <AuthProvider>
      <FolkProvider>{isAuthenticated ? <TabNavigator /> : <AuthNavigator />}</FolkProvider>
    </AuthProvider>
  )
}
