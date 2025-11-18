import { PHONE_REGEX } from '../../../../constants/regex'
import z from 'zod'

export const CreateUserValidationSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  phone: z.string().regex(PHONE_REGEX, 'Invalid phone number')
})

export const UpdateUserValidationSchema = z.object({
  id: z.uuid(),
  data: CreateUserValidationSchema.partial()
})
