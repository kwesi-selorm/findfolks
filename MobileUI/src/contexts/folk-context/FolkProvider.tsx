import { Profile } from '../../@types'
import { ReactNode, useMemo, useState } from 'react'
import userContext from './FolkContext'

type UserProviderProps = {
  children: ReactNode
}

const FolkProvider = ({ children }: UserProviderProps) => {
  const [folkProfile, setFolkProfile] = useState<Profile | null>(null)

  const value = useMemo(() => {
    return {
      folkProfile,
      setFolkProfile
    }
  }, [folkProfile])

  return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export default FolkProvider
