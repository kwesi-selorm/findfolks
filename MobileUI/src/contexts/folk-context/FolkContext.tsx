import React, { createContext, SetStateAction } from 'react'
import { Profile } from '../../@types'

type FolkContext = {
  folkProfile: Profile | null
  setFolkProfile: React.Dispatch<SetStateAction<Profile | null>>
}

const initialState: FolkContext = {
  folkProfile: null,
  setFolkProfile: () => {
    console.log('Set folk profile')
  }
}

const userContext = createContext<FolkContext>(initialState)

export default userContext
