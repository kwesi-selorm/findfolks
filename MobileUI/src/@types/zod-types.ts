import z from 'zod'
import { ContactMethod } from './index'

const ContactMethodEnum = z.nativeEnum(ContactMethod)

const EditProfileValuesSchema = z.object({
  name: z.string().min(3, { message: 'Your username must be at least 3 characters' }),
  homeCountry: z.string(),
  homeCityOrTown: z.string().optional(),
  countryOfResidence: z.string(),
  cityOrTownOfResidence: z.string(),
  preferredContactMethod: ContactMethodEnum,
  contactInfo: z.string(),
  bio: z.string().optional()
})
type EditProfileValuesType = z.infer<typeof EditProfileValuesSchema>

export { EditProfileValuesSchema, type EditProfileValuesType }
