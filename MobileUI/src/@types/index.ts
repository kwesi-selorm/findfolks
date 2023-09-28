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

export { type Connection, type Folk, type Request, ContactMethod }
