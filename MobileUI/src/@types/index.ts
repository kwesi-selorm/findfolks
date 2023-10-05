enum ContactMethod {
  Mobile = 'mobile',
  Email = 'email',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Snapchat = 'snapchat'
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
  name?: string
  homeCountry?: string
  homeCityOrTown?: string
  cityOfResidence?: string
  countryOfResidence?: string
  preferredContactMethod?: ContactMethod
  contactInfo?: string
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

type Request = {
  senderId: number
  recipientId: number
  dateSent: Date
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
  type Request
}
