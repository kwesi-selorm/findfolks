import { ContactMethod, Profile } from '../@types'
import { torProfilePhoto } from './bas64strings'
import { connections } from './connections'

const profile: Profile = {
  id: 1,
  name: 'Tor',
  homeCountry: 'Norway',
  homeCityOrTown: 'Bergen',
  countryOfResidence: 'Norway',
  cityOrTownOfResidence: 'Stavanger',
  profilePhoto: torProfilePhoto,
  bio: 'Hi there',
  preferredContactMethod: ContactMethod.Facebook,
  contactInfo: 'Tor Anresson',
  connections: connections
}

export default profile
