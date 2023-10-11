import React, { SetStateAction } from 'react'
import { LoggedInUser } from '../../@types'

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loggedInUser: LoggedInUser | null
  setLoggedInUser: React.Dispatch<SetStateAction<LoggedInUser | null>>
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loggedInUser: null,
  setLoggedInUser: () => {
    console.log('Set logged-in user')
  }
}

const AuthContext = React.createContext<AuthContextType>(initialState)

export default AuthContext
