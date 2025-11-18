import z from 'zod'

export const CreateCarValidationSchema = z.object({
  make: z.string().min(3),
  model: z.string().min(2),
  year: z.number().nonnegative(),
  licensePlate: z.string().min(4),
  color: z.string().min(3)
})
