import { createContext } from 'react'
import { LoggedInUser } from '../../@types'

type UserContext = {
  loggedInUser: LoggedInUser | null
  setLoggedInUser: (loggedInUser: LoggedInUser | null) => void
}

const initialState: UserContext = {
  loggedInUser: null,
  setLoggedInUser: (loggedInUser: LoggedInUser | null) => {}
}

const userContext = createContext<UserContext>(initialState)

export default userContext
