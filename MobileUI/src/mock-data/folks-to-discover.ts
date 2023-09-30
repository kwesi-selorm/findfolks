import { FolkType } from '../screens/discover/FolkItem'

const folksToDiscover = [
  {
    id: 1,
    name: 'Stanley',
    countryOfResidence: 'USA',
    cityOrTownOfResidence: 'New York',
    homeCountry: 'Ghana',
    profilePhoto:
    bio: 'Happy to connect!'
  },
  {
    id: 2,
    name: 'Bob',
    countryOfResidence: 'Norway',
    cityOrTownOfResidence: 'Bergen',
    homeCountry: 'Togo',
    homeCityOrTown: 'Lomé',
    profilePhoto: null,
    bio: 'Any other Togolese out there to meetup with?'
  }
] as FolkType[]

export { folksToDiscover }