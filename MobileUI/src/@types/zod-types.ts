import z from 'zod'
import { ContactMethod } from './index'

const ContactMethodEnum = z.nativeEnum(ContactMethod)

const EditProfileValuesSchema = z.object({
  name: z.string().min(3, { message: 'Your username must be at least 3 characters' }),
  homeCountry: z.string().min(1, { message: 'Choose your home country from the list' }),
  homeCityOrTown: z.string().optional(),
  countryOfResidence: z.string().min(1),
  cityOrTownOfResidence: z.string().min(1, { message: 'Choose your city from the list' }),
  preferredContactMethod: ContactMethodEnum,
  contactInfo: z.string().min(0, { message: 'Please enter your contact information' }),
  bio: z.string().optional()
})
type EditProfileValuesType = z.infer<typeof EditProfileValuesSchema>

const SignUpValuesSchema = z
  .object({
    name: z.string().min(3, { message: 'Your username must be at least 3 characters' }),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        'Your password must be at least 8 characters and contain at least one letter, one number, and one special character'
    }),
    confirmPassword: z.string(),
    homeCountry: z.string().min(1, { message: 'Choose your home country from the list' }),
    homeCityOrTown: z.string().optional(),
    countryOfResidence: z
      .string()
      .min(1, { message: 'Choose your country of residence from the list' }),
    cityOrTownOfResidence: z.string().min(1, { message: 'Choose your city from the list' }),
    preferredContactMethod: ContactMethodEnum,
    contactInfo: z.string().min(0, { message: 'Please enter your contact information' }),
    bio: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
type SignUpValuesType = z.infer<typeof SignUpValuesSchema>

export { EditProfileValuesSchema, type EditProfileValuesType, type SignUpValuesType }
