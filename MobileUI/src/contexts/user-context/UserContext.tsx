import { createContext } from 'react'

type UserContext = {
  username: string
  token: string
}

const initialState: UserContext = {
  username: '',
  token: ''
}

const userContext = createContext<UserContext>(initialState)

export default userContext
