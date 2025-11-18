import z from 'zod'
import { CreateEmailValidationSchema } from '../_sharedTypes/email'
import { CreatePhoneValidationSchema } from '../_sharedTypes/phone'
import { CreateAddressValidationSchema } from '../address/schemas'

export const CreateContactValidationSchema = z.object({
  email: z.array(CreateEmailValidationSchema).optional(),
  address: z.array(CreateAddressValidationSchema).optional(),
  phone: z.array(CreatePhoneValidationSchema).optional()
})

export const UpdateContactValidationSchema = z.object({
  id: z.uuid(),
  data: CreateContactValidationSchema.partial()
})
