import { ContactMethod } from '.'

interface CreateConnectionRequest {
  folk1Id: number
  folk2Id: number
}

type CreateFolkRequest = {
  email: string
  password: string
  name: string
  homeCountry: string
  countryOfResidence: string
  homeCityOrTown?: string
  cityOrTownOfResidence: string
  preferredContactMethod: ContactMethod
  contactInfo: string
  bio?: string
}

type CreateRequestRequest = {
  senderId: number
  recipientId: number
}

interface DeleteConnectionRequest extends CreateConnectionRequest {}

type EditProfileRequest = {
  name?: string
  homeCountry?: string
  countryOfResidence?: string
  homeCityOrTown?: string
  cityOrTownOfResidence?: string
  preferredContactMethod?: ContactMethod
  contactInfo?: string
  bio?: string
}

type LogInRequest = {
  username: string
  password: string
}

export {
  type CreateConnectionRequest,
  type CreateFolkRequest,
  type CreateRequestRequest,
  type DeleteConnectionRequest,
  type EditProfileRequest,
  type LogInRequest
}
