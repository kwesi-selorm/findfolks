import { useFonts } from 'expo-font'
import { customFonts } from './src/styles'
import AuthProvider from './src/contexts/auth-context/AuthProvider'
import FolkProvider from './src/contexts/folk-context/FolkProvider'
import AuthNavigator from './src/screens/AuthNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ToastProvider from './src/contexts/toast-context/ToastProvider'
// expo install expo-font

// TODO: Add splash screen

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
          <ToastProvider>
            <AuthNavigator />
          </ToastProvider>
        </FolkProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
