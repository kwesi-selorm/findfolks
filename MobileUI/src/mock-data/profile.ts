import { Profile } from '../@types'
import { connections } from './connections'
import { torProfilePhoto } from './bas64strings'

const profile: Profile = {
  id: 1,
  name: 'Tor',
  homeCountry: 'Norway',
  homeCityOrTown: 'Bergen',
  countryOfResidence: 'Norway',
  cityOrTownOfResidence: 'Stavanger',
  profilePhoto: torProfilePhoto,
  bio: 'Hi there',
  preferredContactMethod: 0,
  contactInfo: '',
  connections: connections
}

export default profile
