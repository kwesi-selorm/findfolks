import z from 'zod'
import { ContactMethod } from './index'

const ContactMethodEnum = z.nativeEnum(ContactMethod)

const EditProfileValuesSchema = z.object({
  name: z.string().min(3, { message: 'Your username must be at least 3 characters' }),
  homeCountry: z.string().min(1, { message: 'Choose your home country from the list' }),
  homeCityOrTown: z.string().optional(),
  countryOfResidence: z.string().min(1),
  cityOrTownOfResidence: z.string().min(1, { message: 'Choose your city or town from the list' }),
  preferredContactMethod: ContactMethodEnum,
  contactInfo: z.string().min(0, { message: 'Please enter your contact information' }),
  bio: z.string().optional()
})
type EditProfileValuesType = z.infer<typeof EditProfileValuesSchema>

export { EditProfileValuesSchema, type EditProfileValuesType }
