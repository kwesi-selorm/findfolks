import { LoggedInUser, Profile } from '../../@types'
import { ReactNode, useMemo, useState } from 'react'
import userContext from './UserContext'

type UserProviderProps = {
  children: ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null)
  const [folkProfile, setFolkProfile] = useState<Profile | null>(null)

  const value = useMemo(() => {
    return {
      loggedInUser,
      setLoggedInUser,
      folkProfile,
      setFolkProfile
    }
  }, [loggedInUser, folkProfile])

  return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export default UserProvider
