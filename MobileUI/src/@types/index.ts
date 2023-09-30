type LoggedInUser = {
  id: number
  username: string | null
  token: string
  expiration: Date
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

interface Connection extends Folk {
  preferredContactMethod: ContactMethod
  contactInfo: string
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

enum ContactMethod {
  Mobile = 0,
  Email,
  Facebook,
  Twitter,
  Snapchat
}

export { type LoggedInUser, type Connection, type Folk, type Profile, type Request, ContactMethod }
