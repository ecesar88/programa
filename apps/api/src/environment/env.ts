import z from 'zod'

const PORT = 3333

const environmentSchema = z.object({
  APP_NAME: z.string(),
  SERVER_PORT: z.coerce.number().default(PORT),
  SERVER_HOSTNAME: z.string(),
  DATABASE_URL: z.url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SECRET_KEY: z.string()
})

export const env = environmentSchema.parse(process.env)
