import { linProfilePhoto, stacyProfilePhoto, stanleyProfilePhoto } from './bas64strings'
import { Connection, ContactMethod } from '../@types'

const connections = [
  {
    id: 1,
    name: 'Stanley',
    countryOfResidence: 'Norway',
    cityOrTownOfResidence: 'Oslo',
    homeCountry: 'Ghana',
    homeCityOrTown: 'Tema',
    profilePhoto: stanleyProfilePhoto,
    bio: 'Looking forward to meeting new peeps!',
    preferredContactMethod: ContactMethod.Email,
    contactInfo: 'stanley@example.com'
  },
  {
    id: 2,
    name: 'Bob',
    countryOfResidence: 'Norway',
    cityOrTownOfResidence: 'Bergen',
    homeCountry: 'Togo',
    homeCityOrTown: 'Lomé',
    profilePhoto: null,
    bio: 'Any other Togolese out there to meetup with?',
    preferredContactMethod: ContactMethod.Twitter,
    contactInfo: '@BoB'
  },
  {
    id: 3,
    name: 'Stacy',
    countryOfResidence: 'Norway',
    cityOrTownOfResidence: 'Grimstad',
    homeCountry: 'Sweden',
    homeCityOrTown: 'Gothenburg',
    profilePhoto: stacyProfilePhoto,
    bio: 'Happy to be on this app. I hope to meet others to build a community here in Norway',
    preferredContactMethod: ContactMethod.Snapchat,
    contactInfo: 'stacee'
  },
  {
    id: 4,
    name: 'Lin',
    countryOfResidence: 'Norway',
    cityOrTownOfResidence: 'Bergen',
    homeCountry: 'China',
    homeCityOrTown: 'Shanghai',
    profilePhoto: linProfilePhoto,
    bio: 'New in Norway straight from China. Hoping to make friends from China and everywhere else in the world too! 😁',
    preferredContactMethod: ContactMethod.Facebook,
    contactInfo: 'Lin Zhang'
  }
] as Connection[]

export { connections }
