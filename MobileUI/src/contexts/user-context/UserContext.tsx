import React, { createContext, SetStateAction } from 'react'
import { LoggedInUser, Profile } from '../../@types'

type UserContext = {
  loggedInUser: LoggedInUser | null
  setLoggedInUser: React.Dispatch<SetStateAction<LoggedInUser | null>>
  folkProfile: Profile | null
  setFolkProfile: React.Dispatch<SetStateAction<Profile | null>>
}

const initialState: UserContext = {
  loggedInUser: null,
  setLoggedInUser: () => {
    console.log('Set logged-in user')
  },
  folkProfile: null,
  setFolkProfile: () => {
    console.log('Set folk profile')
  }
}

const userContext = createContext<UserContext>(initialState)

export default userContext
