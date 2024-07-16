import { PHONE_REGEX } from '../constants/regex'
import { z } from 'zod'

export const CreateClientResolver = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    phone: z.string().regex(PHONE_REGEX, 'Telefone em formato inválido')
  })
  .required()
