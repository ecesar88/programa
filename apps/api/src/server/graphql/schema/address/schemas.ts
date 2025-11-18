import z from 'zod'

export const CreateAddressValidationSchema = z.object({
  name: z.string().min(4),
  street: z.string().min(4),
  number: z.string(),
  neighborhood: z.string().min(4),
  complement: z.string().nullish(),
  zipCode: z.string(),
  city: z.string().min(3),
  state: z.string().min(2)
})

export const UpdateAddressValidationSchema = z.object({
  id: z.uuid(),
  data: CreateAddressValidationSchema.partial()
})
