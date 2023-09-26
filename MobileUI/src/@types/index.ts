interface Folk {
  id: number
  name: string
  homeCountry: string
  homeCityOrTown?: string
  countryOfResidence: string
  cityOrTownOfResidence: string
  profilePhoto: string | null
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
  mobile,
  email,
  Facebook,
  'Twitter/X'
}

export { ContactMethod, type Connection, type Folk, type Request }
