import * as z from 'zod/v4'

export const envVariables = z.object({
  DATABASE_URL: z.string().optional(),
  SERVER_PORT: z.string().optional(),
  SERVER_HOSTNAME: z.string().optional()
})

envVariables.parse(process.env)
