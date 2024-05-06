import { z } from 'zod'

export const CreateOrderResolver = z
  .object({
    dateTime: z.coerce.date(),
    address: z.string().min(10, 'Endereço e obrigatorio'),
    food: z.string()
  })
  .required()
