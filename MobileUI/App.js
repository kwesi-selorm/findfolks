import { useFonts } from 'expo-font'
import { customFonts } from './src/styles'
import AuthProvider from './src/contexts/auth-context/AuthProvider'
import FolkProvider from './src/contexts/folk-context/FolkProvider'
import AuthNavigator from './src/screens/AuthNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootSiblingParent } from 'react-native-root-siblings'
// expo install expo-font

export default function App() {
  const [fontsLoaded] = useFonts(customFonts)

  if (!fontsLoaded) {
    return null
  }

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FolkProvider>
          <RootSiblingParent>
            <AuthNavigator />
          </RootSiblingParent>
        </FolkProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
