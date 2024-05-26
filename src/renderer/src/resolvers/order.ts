import { z } from 'zod'

export const CreateOrderResolver = z
  .object({
    dateTime: z.coerce.date(),
    address: z.string().min(10, 'Endereço é obrigatorio'),
    food: z.string()
  })
  .required()


export const CreateOrderObservation = z
  .object({
    food: z.string()
  })
  .required()

