enum ContactMethod {
  Mobile = 0,
  Email,
  Facebook,
  Twitter,
  Snapchat
}

enum RequestType {
  RECEIVED = 'received',
  SENT = 'sent'
}

type City = {
  id: number
  label: string
  value: string
}

interface Connection extends Folk {
  preferredContactMethod: ContactMethod
  contactInfo: string
}

type Country = {
  id: number
  value: string
}

type EditProfileFormValues = {
  name: string
  homeCountry: string
  homeCityOrTown?: string
  cityOrTownOfResidence: string
  countryOfResidence: string
  preferredContactMethod: number
  contactInfo: string
  bio?: string
}

interface Folk {
  id: number
  name: string
  homeCountry: string
  homeCityOrTown?: string
  countryOfResidence: string
  cityOrTownOfResidence: string
  profilePhoto: string | null
  bio?: string
}

type LoggedInUser = {
  id: number
  username: string | null
  token: string
  expiration: Date
}

interface Profile extends Folk {
  preferredContactMethod: ContactMethod
  contactInfo: string
  connections: Array<Connection>
}

type ReceivedRequest = {
  senderId: number
  dateReceived: Date
}

type Request = {
  senderId: number
  recipientId: number
  dateSent: Date
}

type SentRequest = {
  recipientId: number
  dateSent: Date
}

type User = {
  userName: string
  email: string
}

type UserRequests = {
  sentRequests: Array<SentRequest>
  receivedRequests: Array<ReceivedRequest>
}

type ValidationError = {
  message: string
  path: string
  pathMessage: string
}

export {
  ContactMethod,
  RequestType,
  type City,
  type Connection,
  type Country,
  type EditProfileFormValues,
  type Folk,
  type LoggedInUser,
  type Profile,
  type ReceivedRequest,
  type Request,
  type SentRequest,
  type User,
  type UserRequests,
  type ValidationError
}
