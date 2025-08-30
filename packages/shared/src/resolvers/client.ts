import { PHONE_REGEX } from '../constants/regex'
import * as z from 'zod/v4'

export const CreateClientResolver = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    phone: z.string().regex(PHONE_REGEX, 'Telefone em formato inválido')
  })
  .required()
