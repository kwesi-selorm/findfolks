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

type LogInRequest = {
  username: string
  password: string
}

type UpdateFolkRequest = Omit<CreateFolkRequest, 'email' | 'password'> & Partial<CreateFolkRequest>

export {
  type CreateConnectionRequest,
  type CreateFolkRequest,
  type CreateRequestRequest,
  type DeleteConnectionRequest,
  type LogInRequest,
  type UpdateFolkRequest
}