import AuthContext from './AuthContext'
import { ReactNode, useMemo, useState } from 'react'
import { LoggedInUser } from '../../@types'

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      loggedInUser,
      setLoggedInUser
    }),
    [isAuthenticated, loggedInUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
